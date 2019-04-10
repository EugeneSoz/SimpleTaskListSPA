using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SimpleTaskListSPA.Data;

namespace SimpleTaskListSPA.Models.Database
{
    public class DataRW
    {
        //создать файл с данными
        public void CreateJsonData<T>(List<T> data, string fileName = "data")
        {
            string json = JsonConvert.SerializeObject(data);

            using (StreamWriter writer = File.CreateText($"Files\\SavedData\\{fileName}.json"))
            {
                writer.Write(json);
            }
        }

        public void SeedDataFromFile(DataContext dataContext)
        {
            string categoryJson = GetDataFromJson("savedData");
            List<Category> categories = JsonConvert.DeserializeObject<List<Category>>(categoryJson);
            List<TaskItem> tasks = new List<TaskItem>();
            List<Category> unusedCategories = new List<Category>();

            foreach (Category category in categories)
            {
                if (category.TaskItems.Count() == 0)
                {
                    unusedCategories.Add(category);
                    continue;
                }
                else
                {
                    foreach (TaskItem taskItem in category.TaskItems)
                    {
                        taskItem.Category = category;
                        tasks.Add(taskItem);
                    }
                }
            }
            dataContext.Tasks.AddRange(tasks);
            dataContext.Categories.AddRange(unusedCategories);
        }

        private string GetDataFromJson(string fileName)
        {
            StringBuilder result = new StringBuilder();

            using (StreamReader reader = File.OpenText($"Files\\DataForUpload\\{fileName}.json"))
            {
                while (reader.Peek() != -1)
                {
                    result.Append(reader.ReadLine());
                    result.AppendLine();
                }
            }

            result.Replace("\t", "    ");

            return result.ToString();
        }
    }
}
