using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleTaskListSPA.Data;

namespace SimpleTaskListSPA.Models
{
    //класс хранит текущие параметры страницы
    public class QueryOptions
    {
        private string _sortPropertyName;
        private string _searchPropertyName;

        //свойство по которому сортируем
        public string SortPropertyName
        {
            get => _sortPropertyName;
            set
            {
                _sortPropertyName = GetValueWithCapitalLetter(value);
            }
        }
        //сортировка по убыванию
        public bool DescendingOrder { get; set; }
        //по какому св-ву поиск
        public string SearchPropertyName {
            get => _searchPropertyName;
            set
            {
                _searchPropertyName = GetValueWithCapitalLetter(value);
            }
        }
        //что ищем
        public string SearchTerm { get; set; }
        //id категории книги
        public long? SelectedCategoryId { get; set; }

        private string GetValueWithCapitalLetter(string valueToChange)
        {
            if (!string.IsNullOrEmpty(valueToChange))
            {
                return valueToChange[0].ToString().ToUpper() + valueToChange.Substring(1);
            }
            else
            {
                return valueToChange;
            }
        }
    }
}
