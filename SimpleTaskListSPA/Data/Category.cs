using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTaskListSPA.Data
{
    //класс определяющий категорию задач
    public class Category : EntityBase
    {
        //имя категории
        [Required(ErrorMessage = "Введите название")]
        [StringLength(60, MinimumLength = 3, ErrorMessage = "Название должно быть от 3 до 60 символов")]
        public string Name { get; set; } = string.Empty;
        public IEnumerable<TaskItem> TaskItems { get; set; }
    }
}
