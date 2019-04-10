using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using SimpleTaskListSPA.Data;

namespace SimpleTaskListSPA.Infrastructure
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class CorrectDateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DateTime? date = (DateTime?)value;
            TaskItem taskItem = (TaskItem)validationContext.ObjectInstance;
            bool isDateUsed = taskItem.IsPlanningDateUsed;

            string[] memberNames = validationContext.MemberName != null
                    ? new string[] { validationContext.MemberName }
                    : null;

            if (!date.HasValue && isDateUsed)
            {
                return new ValidationResult("Укажите дату в формате чч.мм.гггг", memberNames);
            }

            return ValidationResult.Success;
        }
    }
}
