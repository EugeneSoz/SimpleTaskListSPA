using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimpleTaskListSPA.Data;
using SimpleTaskListSPA.Data.DTO;
using SimpleTaskListSPA.Models;
using SimpleTaskListSPA.Models.Repo;

namespace SimpleTaskListSPA.Controllers
{
    public class TaskItemController : BaseController
    {
        private readonly ITaskItemRepo _repo;

        public TaskItemController(ITaskItemRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("task/{id}")]
        public async Task<TaskItem> GetTaskAsync(long id)
        {
            TaskItem task = await _repo.GetTaskAsync(id);

            return task;
        }

        [HttpPost("tasks")]
        public async Task<TaskItemResponse> ReceiveTasksAsync([FromBody] QueryOptions options)
        {
            TaskItemResponse tasks;
            try
            {
                tasks = await _repo.ReceiveTasksAsync(options);
            }
            catch (Exception)
            {
                tasks = null;
            }

            return tasks;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateTaskAsync([FromBody] TaskItem task)
        {
            task = SetCreationAndEffectiveDates(task);

            return await CreateAsync(task, _repo.AddAsync);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateTaskAsync([FromBody] TaskItem task)
        {
            task = SetCreationAndEffectiveDates(task);
            return await UpdateAsync(task, _repo.UpdateAsync);
        }

        [HttpPut("setdate")]
        public async Task<ActionResult> SetTaskDateAsync([FromBody] TaskDates taskDates)
        {
            TaskItem task;
            task = SetPlanningDate(taskDates);
            task = SetCreationAndEffectiveDates(task);

            return await UpdateAsync(task, _repo.UpdateAsync);
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteTaskAsync([FromBody] TaskItem task)
        {
            return await DeleteAsync(task, _repo.DeleteAsync);
        }

        private TaskItem SetPlanningDate(TaskDates taskDates)
        {
            TaskItem task = taskDates.TaskItem;
            int days = taskDates.DaysAdditionToPlannigDate;

            switch (days)
            {
                case 0:
                    task.PlanningDate = DateTime.Today;
                    break;
                case 1:
                    task.PlanningDate = DateTime.Today.AddDays(1);
                    break;
                default:
                    task.PlanningDate = null;
                    break;
            }

            return task;
        }

        private TaskItem SetCreationAndEffectiveDates(TaskItem taskItem)
        {
            if (taskItem.CreationDate == null)
            {
                taskItem.CreationDate = DateTime.Today;
            }
            if (taskItem.IsCompleted && taskItem.EffectiveDate == null)
            {
                taskItem.EffectiveDate = DateTime.Today;
            }
            else if (!taskItem.IsCompleted && taskItem.EffectiveDate.HasValue)
            {
                taskItem.EffectiveDate = null;
            }

            return taskItem;
        }
    }
}
