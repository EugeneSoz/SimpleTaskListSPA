using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTaskListSPA.Models
{
    //класс хранит текущие параметры страницы
    public class QueryOptions
    {
        //свойство по которому сортируем
        public string SortPropertyName { get; set; }
        //сортировка по убыванию
        public bool DescendingOrder { get; set; }
        //по какому св-ву поиск
        public string SearchPropertyName { get; set; }
        //что ищем
        public string SearchTerm { get; set; }
        //id категории книги
        public long? SelectedCategoryId { get; set; }
    }
}
