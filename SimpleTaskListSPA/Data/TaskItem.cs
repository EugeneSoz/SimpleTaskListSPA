using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using SimpleTaskListSPA.Infrastructure;

namespace SimpleTaskListSPA.Data
{
    //класс, определяющий создаваемую в приложении задачу
    public class TaskItem : EntityBase
    {
        //название задачи
        [Required(ErrorMessage = "Введите название")]
        [StringLength(60, MinimumLength = 3, ErrorMessage = "Название должно быть от 3 до 60 символов")]
        public string Name { get; set; } = string.Empty;

        //дата создания задачи
        public DateTime? CreationDate { get; set; }

        //планируемая дата выполнения
        [CorrectDate]
        public DateTime? PlanningDate { get; set; }

        //фактическая дата выполнения (когда задача выполнена по факту)
        public DateTime? EffectiveDate { get; set; }

        //установлена ли планируемая дата
        public bool IsPlanningDateUsed { get; set; }

        //завершена ли?
        public bool IsCompleted { get; set; }

        //просрочена ли?
        public bool IsOverdue { get; set; }

        //помечена ли задача звёздочкой
        public bool IsImportant { get; set; }

        //к какой категории относится задача
        public Category Category { get; set; }
        [Range(1, double.MaxValue, ErrorMessage = "Укажите категорию задачи")]
        public long CategoryId { get; set; }
    }
}
