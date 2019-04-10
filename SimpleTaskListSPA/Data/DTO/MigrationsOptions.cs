using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleTaskListSPA.Models.Database;

namespace SimpleTaskListSPA.Data.DTO
{
    public class MigrationsOptions
    {
        public MigrationsOptions() { }

        public MigrationsOptions(int tasksCount, int categoriesCount,
            MigrationsManager manager, string infoMessage)
        {
            TasksCount = tasksCount;
            CategoriesCount = categoriesCount;
            ContextNames = manager.ContextNames ?? Enumerable.Empty<string>();
            AllMigrations = manager.AllMigrations ?? Enumerable.Empty<string>();
            PendingMigrations = manager.PendingMigrations ?? Enumerable.Empty<string>();
            AppliedMigrations = manager.AppliedMigrations ?? Enumerable.Empty<string>();
            InfoMessage = infoMessage;
        }

        public int TasksCount { get; set; }
        public int CategoriesCount { get; set; }
        public int PublishersCount { get; set; }
        public IEnumerable<string> ContextNames { get; set; } = Enumerable.Empty<string>();
        public IEnumerable<string> AppliedMigrations { get; set; } = Enumerable.Empty<string>();
        public IEnumerable<string> PendingMigrations { get; set; } = Enumerable.Empty<string>();
        public IEnumerable<string> AllMigrations { get; set; } = Enumerable.Empty<string>();
        public string InfoMessage { get; set; } = string.Empty;
    }
}
