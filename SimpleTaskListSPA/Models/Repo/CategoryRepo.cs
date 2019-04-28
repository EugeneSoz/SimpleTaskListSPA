using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SimpleTaskListSPA.Data;
using SimpleTaskListSPA.Data.DTO;
using SimpleTaskListSPA.Enums;

namespace SimpleTaskListSPA.Models.Repo
{
    public class CategoryRepo : BaseRepo<Category>, ICategoryRepo
    {
        public CategoryRepo(DataContext ctx) : base(ctx) { }

        public async Task<Category> GetCategoryAsync(long id)
        {
            Category category = await GetEntities()
                .Include(c => c.TaskItems)
                .SingleOrDefaultAsync(c => c.Id == id);

            category.TaskItems.ToList().ForEach(t => t.Category = null);

            return category;
        }

        public async Task<List<CategoryResponse>> GetCategoriesAsync()
        {
            List<CategoryResponse> categories = new List<CategoryResponse>();

            List<CategoryResponse> specialCategories = GetSpecialCategories();

            List<CategoryResponse> generalCategories = await GetGeneralCategories();

            //добавить в коллекцию вначале основную категорию, а потом остольные по алфавиту
            long homeCategoryId = generalCategories.Min(cat => cat.Id);
            CategoryResponse homeCategory = generalCategories.Find(c => c.Id == homeCategoryId);
            categories.Add(homeCategory);
            foreach (CategoryResponse category in generalCategories)
            {
                if (category.Id != homeCategoryId)
                {
                    categories.Add(category);
                }
            }
            categories.InsertRange(1, specialCategories);

            return categories;
        }

        private int GetStarredTaskCount(bool isOverdue)
        {
            if (isOverdue)
            {
                return Context.Tasks
                    .Where(t => t.IsImportant && t.IsOverdue && t.EffectiveDate == null)
                    .Count();
            }

            return Context.Tasks
               .Where(t => t.IsImportant && t.EffectiveDate == null)
               .Count();
        }

        private int GetTodayTaskCount(bool isOverdue)
        {
            if (isOverdue)
            {
                return Context.Tasks
                .Where(t => t.PlanningDate <= DateTime.Today && t.IsOverdue && t.EffectiveDate == null)
                .Count();
            }

            return Context.Tasks
                .Where(t => t.PlanningDate <= DateTime.Today && t.EffectiveDate == null)
                .Count();
        }

        private int GetWeekTaskCount(bool isOverdue)
        {
            //количество дней до конца текущей недели (0 - если воскресенье)
            int thisWeekRemainingDaysCount = (int)DateTime.Today.DayOfWeek == 0
                ? 0
                : 7 - (int)DateTime.Today.DayOfWeek;
            DateTime thisWeekEndDate = DateTime.Today.AddDays(thisWeekRemainingDaysCount);

            if (isOverdue)
            {
                return Context.Tasks
                .Where(t => t.PlanningDate <= thisWeekEndDate && t.IsOverdue && t.EffectiveDate == null)
                .Count();
            }

            return Context.Tasks
                .Where(t => t.PlanningDate <= thisWeekEndDate && t.EffectiveDate == null)
                .Count();
        }

        private List<CategoryResponse> GetSpecialCategories()
        {
            return new List<CategoryResponse>
                {
                    new CategoryResponse
                    {
                        Id = (long)CategoryFilterType.Starred,
                        Name = "Отмеченные",
                        OverdueTasksCount = GetStarredTaskCount(true),
                        AllTasksCount = GetStarredTaskCount(false)
                    },
                    new CategoryResponse
                    {
                        Id = (long)CategoryFilterType.Today,
                        Name = "Сегодня",
                        OverdueTasksCount = GetTodayTaskCount(true),
                        AllTasksCount = GetTodayTaskCount(false)
                    },
                    new CategoryResponse
                    {
                        Id = (long)CategoryFilterType.Week,
                        Name = "Неделя",
                        OverdueTasksCount = GetWeekTaskCount(true),
                        AllTasksCount = GetWeekTaskCount(false)
                    }
                };
        }

        private async Task<List<CategoryResponse>> GetGeneralCategories()
        {
            return await Context.Categories
                    .GroupJoin(Context.Tasks, c => c.Id, t => t.CategoryId, (c, t) => new { c, t })
                    .SelectMany(temp => temp.t.DefaultIfEmpty(), (temp, task) => new
                    {
                        temp.c.Id,
                        temp.c.Name,
                        OverdueCount = ((task.IsOverdue == (bool?)true)
                        && (task.EffectiveDate == null)) ? 1 : 0,
                        TotalCount = ((task != null) && (task.EffectiveDate == null)) ? 1 : 0
                    })
                    .GroupBy(q => new { q.Id, q.Name })
                    .OrderBy(q => q.Key.Name)
                    .Select(q => new CategoryResponse
                    {
                        Id = q.Key.Id,
                        Name = q.Key.Name,
                        OverdueTasksCount = q.Sum(c => c.OverdueCount),
                        AllTasksCount = q.Sum(c => c.TotalCount)
                    })
                    .ToListAsync();
        }
    }
}
