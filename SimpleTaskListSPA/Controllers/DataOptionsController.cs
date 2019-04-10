using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleTaskListSPA.Data;
using SimpleTaskListSPA.Data.DTO;
using SimpleTaskListSPA.Models.Database;
using SimpleTaskListSPA.Models.Repo;

namespace SimpleTaskListSPA.Controllers
{
    [Route("api/[controller]")]
    public class DataOptionsController : ControllerBase
    {
        private readonly ITaskItemRepo _taskRepo;
        private readonly ICategoryRepo _categoryRepo;
        private MigrationsManager _manager;

        public DataOptionsController(ITaskItemRepo taskRepo, ICategoryRepo categoryRepo, 
            MigrationsManager manager)
        {
            _taskRepo = taskRepo;
            _categoryRepo = categoryRepo;
            _manager = manager;
        }

        [HttpGet("services")]
        public MigrationsOptions DbServices()
        {
            MigrationsOptions migrationsOptions = GetMigrationsOptions();

            return migrationsOptions;
        }

        [HttpGet("apply/{contextName}/{migrationName}")]
        public MigrationsOptions ApplyMigrationsAsync(string contextName, string migrationName)
        {
            string infoMessage = string.Empty;
            try
            {
                _manager.Migrate(contextName, migrationName);
                infoMessage = "Миграции применены";
            }
            catch (Exception ex)
            {
                infoMessage = ex.Message;
            }

            return GetMigrationsOptions(contextName, infoMessage);
        }

        private MigrationsOptions GetMigrationsOptions(string contextName = null,
            string infoMessage = null)
        {
            int taskItems = (_taskRepo.GetEntities())?.Count() ?? 0;
            int categories = (_categoryRepo.GetEntities())?.Count() ?? 0;

            if (!string.IsNullOrEmpty(contextName))
            {
                _manager.ContextName = contextName;
            }
            return new MigrationsOptions(taskItems, categories, _manager, infoMessage);
        }

        [HttpGet("save")]
        public string SaveDataToJson()
        {
            IQueryable<Category> dbcategories = 
                _categoryRepo.GetEntities().Include(c => c.TaskItems).OrderBy(c => c.Id);
            List<Category> categories = dbcategories.ToList();
            foreach (Category category in categories)
            {
                category.Id = 0;
                foreach (TaskItem taskItem in category.TaskItems)
                {
                    taskItem.Id = 0;
                    taskItem.CategoryId = 0;
                    taskItem.Category = null;
                }
            }

            DataRW dataRW = new DataRW();

            string msg = string.Empty;
            try
            {
                dataRW.CreateJsonData(categories, "savedData");

                msg = "Данные сохранены в файл";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpGet("seed/{contextName}/{fromFile}")]
        public string SeedDatabase(string contextName, bool fromFile)
        {
            _manager.ContextName = contextName;
            string msg = SeedData.SeedDatabase(_manager.Context, fromFile);

            return msg;
        }

        [HttpGet("clear/{contextName}")]
        public string ClearDatabase(string contextName)
        {
            _manager.ContextName = contextName;
            string msg = SeedData.ClearDatabase(_manager.Context);

            return msg;
        }
    }
}
