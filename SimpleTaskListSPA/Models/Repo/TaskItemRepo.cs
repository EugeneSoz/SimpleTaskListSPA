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
    public class TaskItemRepo : BaseRepo<TaskItem>, ITaskItemRepo
    {
        public TaskItemRepo(DataContext ctx) : base(ctx) { }
           
        public async Task<TaskItemResponse> ReceiveTasksAsync(QueryOptions options)
        {
            if (options.SelectedCategoryId == null)
            {
                options.SelectedCategoryId = Context.Categories.Min(c => c.Id);
            }
            IQueryable<TaskItem> processedTasks = Context.Tasks;

            QueryProcessing queryProcessing = new QueryProcessing(options);
            processedTasks = queryProcessing.FilterTasks(processedTasks);

            if (options.SelectedCategoryId == 0)
            {
                return await GetFoundTasksAsync(processedTasks, queryProcessing);
            }
            else if (options.SelectedCategoryId == (long)CategoryFilterType.Starred)
            {
                return await GetStarredTasksAsync(processedTasks, queryProcessing);
            }
            else if (options.SelectedCategoryId == (long)CategoryFilterType.Today)
            {
                return await GetTodayTasksAsync(processedTasks, queryProcessing);
            }
            else if (options.SelectedCategoryId == (long)CategoryFilterType.Week)
            {
                return await GetWeekTasksAsync(processedTasks, queryProcessing);
            }
            else
            {
                return await GetTasksAsync(processedTasks, queryProcessing);
            }
        }

        private async Task<TaskItemResponse> GetTasksAsync(IQueryable<TaskItem> processedTasks,
            QueryProcessing queryProcessing)
        {
            processedTasks = queryProcessing.SortTasks(processedTasks);

            List<TaskItem> tasks = await processedTasks.ToListAsync();

            return new TaskItemResponse
            {
                Tasks = new Dictionary<string, List<TaskItem>>
                {
                    ["active"] = tasks?.Where(t => t.IsCompleted == false).ToList(),
                    ["completed"] = tasks?.Where(t => t.IsCompleted == true).ToList()
                }
            };
        }

        private async Task<TaskItemResponse> GetFoundTasksAsync(IQueryable<TaskItem> processedTasks,
            QueryProcessing queryProcessing)
        {
            processedTasks = queryProcessing.SearchTasks(processedTasks);
            processedTasks = processedTasks.Where(t => t.EffectiveDate == null);
            processedTasks = queryProcessing.SortTasks(processedTasks);

            return await GetTaskDictionaryAsync(processedTasks);
        }

        private async Task<TaskItemResponse> GetStarredTasksAsync(IQueryable<TaskItem> processedTasks,
            QueryProcessing queryProcessing)
        {
            processedTasks = processedTasks.Where(t => t.EffectiveDate == null && t.IsImportant);
            processedTasks = queryProcessing.SortTasks(processedTasks);

            return await GetTaskDictionaryAsync(processedTasks);
        }

        private async Task<TaskItemResponse> GetTodayTasksAsync(IQueryable<TaskItem> processedTasks,
            QueryProcessing queryProcessing)
        {
            processedTasks = processedTasks.Where(t => t.EffectiveDate == null
                                 && t.PlanningDate.HasValue
                                 && t.PlanningDate <= DateTime.Today);
            processedTasks = queryProcessing.SortTasks(processedTasks);

            return await GetTaskDictionaryAsync(processedTasks);
        }

        

        private async Task<TaskItemResponse> GetWeekTasksAsync(IQueryable<TaskItem> processedTasks,
            QueryProcessing queryProcessing)
        {
            processedTasks = processedTasks.Where(t => t.PlanningDate.HasValue && t.EffectiveDate == null);
            processedTasks = queryProcessing.SortTasks(processedTasks);

            int thisWeekRemainingDaysCount = DateTime.Today.DayOfWeek == 0
                ? 0
                : 7 - (int)DateTime.Today.DayOfWeek;
            DateTime thisWeekEndDate = DateTime.Today.AddDays(thisWeekRemainingDaysCount);

            Dictionary<string, List<TaskItem>> tasks = await Context.Tasks
                .Where(t => t.PlanningDate <= thisWeekEndDate
                         && t.PlanningDate.HasValue
                         && t.EffectiveDate == null)
                .Select(t => new { t.PlanningDate })
                .Distinct()
                .OrderBy(t => t.PlanningDate)
                .GroupJoin(
                    processedTasks,
                    t1 => t1.PlanningDate,
                    t2 => t2.PlanningDate,
                    (t1, t2) => new { t1.PlanningDate, t2 })
                .ToDictionaryAsync(a => a.PlanningDate.Value.ToShortDateString(), a => a.t2.ToList());

            return new TaskItemResponse
            {
                Tasks = tasks
            };
        }

        private async Task<TaskItemResponse> GetTaskDictionaryAsync(IQueryable<TaskItem> processedTasks)
        {
            long minId = Context.Categories.Min(c => c.Id);
            IQueryable<Category> secondCategories = Context.Categories
                .Where(c => c.Id > minId)
                .OrderBy(c => c.Name);

            Dictionary<string, List<TaskItem>> tasks = await Context.Categories
                .Where(c => c.Id == minId)
                .Concat(secondCategories).GroupJoin(
                    processedTasks,
                    c => c.Id,
                    t => t.CategoryId,
                    (category, taskItems) => new { category.Name, taskItems })
                .Where(a => a.taskItems.Count() > 0)
                .ToDictionaryAsync(anonymous => anonymous.Name, anonymous => anonymous.taskItems.ToList());

            return new TaskItemResponse
            {
                Tasks = tasks
            };
        }
    }
}
