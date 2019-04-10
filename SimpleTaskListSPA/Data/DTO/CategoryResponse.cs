using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTaskListSPA.Data.DTO
{
    public class CategoryResponse : Category
    {
        public int OverdueTasksCount { get; set; }
        public int AllTasksCount { get; set; }
    }
}
