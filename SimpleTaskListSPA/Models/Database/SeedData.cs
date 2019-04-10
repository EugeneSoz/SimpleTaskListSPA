using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SimpleTaskListSPA.Data;

namespace SimpleTaskListSPA.Models.Database
{
    //класс для первоночального наполнения бд
    public static class SeedData
    {
        public static string SeedDatabase(DbContext context, bool fromFile)
        {
            string message = "Необходимо применить миграции база данных перед её заполнением";
            if (context.Database.GetPendingMigrations().Count() == 0)
            {
                try
                {
                    if (context is DataContext dataContext && dataContext.Tasks.Count() == 0)
                    {
                        if (fromFile)
                        {
                            DataRW dataRW = new DataRW();
                            dataRW.SeedDataFromFile(dataContext);
                        }
                        else
                        {
                            SeedWithTestData(dataContext);
                        }

                        message = "Данные загружены";
                    }
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }
            }

            return message;
        }

        public static string ClearDatabase(DbContext context)
        {
            string message = string.Empty;
            if (context.Database.GetPendingMigrations().Count() == 0)
            {
                try
                {
                    if (context is DataContext dataContext && dataContext.Tasks.Count() > 0)
                    {
                        dataContext.Tasks.RemoveRange(dataContext.Tasks);
                        dataContext.Categories.RemoveRange(dataContext.Categories);
                    }
                    else
                    {
                        message = "Удаление не произведено, так как данные отсутствуют";
                    }
                    context.SaveChanges();

                    message = "Данные удалены из базы данных";
                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }

            }
            return message;
        }

        private static void SeedWithTestData(DataContext context)
        {
            Category c0 = new Category { Name = "Входящие" };
            Category c1 = new Category { Name = "Дом" };
            Category c2 = new Category { Name = "Продукты" };
            Category c3 = new Category { Name = "Отдых" };
            Category c4 = new Category { Name = "Компьютер" };

            context.Categories.Add(c0);
            context.Categories.Add(c1);
            context.Categories.Add(c2);
            context.Categories.Add(c3);
            context.Categories.Add(c4);

            context.Tasks.AddRange(
                new TaskItem
                {
                    Name = "Сварить картошку",
                    Category = c0,
                    CreationDate = DateTime.Today,
                    PlanningDate = null,
                    EffectiveDate = null,
                    IsPlanningDateUsed = false,
                    IsImportant = false,
                    IsCompleted = false,
                    IsOverdue = false
                },
                new TaskItem
                {
                    Name = "Купить курицу",
                    Category = c0,
                    CreationDate = DateTime.Today,
                    PlanningDate = null,
                    EffectiveDate = null,
                    IsPlanningDateUsed = false,
                    IsImportant = false,
                    IsCompleted = false,
                    IsOverdue = false
                },
                new TaskItem
                {
                    Name = "Пообедать",
                    Category = c0,
                    CreationDate = DateTime.Today,
                    PlanningDate = DateTime.Today.AddDays(1),
                    EffectiveDate = null,
                    IsPlanningDateUsed = true,
                    IsImportant = false,
                    IsCompleted = false,
                    IsOverdue = false
                },
                new TaskItem
                {
                    Name = "Пропылесосить",
                    Category = c0,
                    CreationDate = DateTime.Today,
                    PlanningDate = DateTime.Today.AddDays(1),
                    EffectiveDate = null,
                    IsPlanningDateUsed = true,
                    IsImportant = false,
                    IsCompleted = false,
                    IsOverdue = false
                },
                new TaskItem
                {
                    Name = "Протереть пыль",
                    Category = c0,
                    CreationDate = DateTime.Today,
                    PlanningDate = DateTime.Today.AddDays(1),
                    EffectiveDate = null,
                    IsPlanningDateUsed = true,
                    IsImportant = false,
                    IsCompleted = false,
                    IsOverdue = false
                },
                new TaskItem
                {
                    Name = "Слетать в Крым",
                    Category = c0,
                    CreationDate = DateTime.Today,
                    PlanningDate = DateTime.Today.AddDays(1),
                    EffectiveDate = null,
                    IsPlanningDateUsed = true,
                    IsImportant = false,
                    IsCompleted = false,
                    IsOverdue = false
                },
                new TaskItem
                {
                    Name = "Посмотреть фильм",
                    Category = c0,
                    CreationDate = DateTime.Today,
                    PlanningDate = DateTime.Today.AddDays(1),
                    EffectiveDate = null,
                    IsPlanningDateUsed = true,
                    IsImportant = false,
                    IsCompleted = false,
                    IsOverdue = false
                },
                new TaskItem
                {
                    Name = "Выключить компьютер",
                    Category = c0,
                    CreationDate = DateTime.Today,
                    PlanningDate = DateTime.Today.AddDays(1),
                    EffectiveDate = null,
                    IsPlanningDateUsed = true,
                    IsImportant = false,
                    IsCompleted = false,
                    IsOverdue = false
                });
        }
    }
}
