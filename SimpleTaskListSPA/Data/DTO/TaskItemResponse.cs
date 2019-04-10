using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTaskListSPA.Data.DTO
{
    public class TaskItemResponse
    {
        public Dictionary<string, IEnumerable<TaskItem>> Tasks { get; set; }
    }
}
