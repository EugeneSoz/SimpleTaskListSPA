using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTaskListSPA.Data.DTO
{
    public class TaskItemData
    {
        public long Id
        {
            get => TaskItem.Id;
            set { TaskItem.Id = value; }
        }

        public string Name
        {
            get => TaskItem.Name;
            set { TaskItem.Name = value; }
        }

        public string CreationDate => TaskItem.CreationDate.HasValue
            ? TaskItem.CreationDate.Value.ToShortDateString() : "Не указана";

        public string PlanningDate
        {
            get => TaskItem.PlanningDate.HasValue
                ? TaskItem.PlanningDate.Value.ToShortDateString() : string.Empty;
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    TaskItem.IsPlanningDateUsed = false;
                    TaskItem.PlanningDate = null;
                }
                else
                {
                    TaskItem.IsPlanningDateUsed = true;
                    bool isOk = DateTime.TryParse(value, out DateTime date);
                    if (isOk)
                    {
                        TaskItem.PlanningDate = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                    }
                    else
                    {
                        TaskItem.PlanningDate = null;
                    }
                }
            }
        }

        public bool IsCompleted
        {
            get => TaskItem.IsCompleted;
            set { TaskItem.IsCompleted = value; }
        }

        public bool IsOverdue => TaskItem.IsOverdue;

        public bool IsImportant
        {
            get => TaskItem.IsImportant;
            set { TaskItem.IsImportant = value; }
        }

        public long CategoryId
        {
            get => TaskItem.CategoryId;
            set { TaskItem.CategoryId = value; }
        }

        public TaskItem TaskItem { get; set; } = new TaskItem();
    }
}
