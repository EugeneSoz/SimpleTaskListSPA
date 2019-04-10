using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleTaskListSPA.Data;

namespace SimpleTaskListSPA.Models
{
    public class QueryProcessing
    {
        private readonly QueryOptions options;

        public QueryProcessing(QueryOptions options)
        {
            this.options = options;
        }

        public IQueryable<TaskItem> SearchTasks(IQueryable<TaskItem> query)
        {
            if (string.IsNullOrEmpty(options.SearchTerm))
            {
                return query;
            }

            return query.Where(t => t.Name.ToLower().Contains(options.SearchTerm.ToLower()));
        }

        public IQueryable<TaskItem> FilterTasks(IQueryable<TaskItem> query)
        {
            if (options.SelectedCategoryId <= 0)
            {
                return query;
            }

            return query.Where(t => t.CategoryId == options.SelectedCategoryId);
        }

        public IQueryable<TaskItem> SortTasks(IQueryable<TaskItem> query)
        {
            switch (options.SortPropertyName)
            {
                case nameof(TaskItem.Name):
                    return options.DescendingOrder
                        ? query.OrderByDescending(t => t.Name)
                        : query.OrderBy(t => t.Name);
                case nameof(TaskItem.CreationDate):
                    return options.DescendingOrder
                        ? query.OrderByDescending(t => t.CreationDate)
                        : query.OrderBy(t => t.CreationDate);
                case nameof(TaskItem.PlanningDate):
                    return options.DescendingOrder
                        ? query.OrderByDescending(t => t.PlanningDate)
                        : query.OrderBy(t => t.PlanningDate);
                case nameof(TaskItem.IsImportant):
                    return options.DescendingOrder
                        ? query.OrderByDescending(t => t.IsImportant)
                        : query.OrderBy(t => t.IsImportant);
                default:
                    return query.OrderBy(t => t.Id);
            }
        }
    }
}
