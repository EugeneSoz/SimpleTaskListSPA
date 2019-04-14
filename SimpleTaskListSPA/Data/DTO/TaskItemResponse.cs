using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTaskListSPA.Data.DTO
{
    public class TaskItemResponse
    {
        public Dictionary<string, List<TaskItem>> Tasks { get; set; }
    }
}
