using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleTaskListSPA.Data;
using SimpleTaskListSPA.Data.DTO;

namespace SimpleTaskListSPA.Models.Repo
{
    public interface ITaskItemRepo : IBaseRepo<TaskItem>
    {
        Task<TaskItem> GetTaskAsync(long id);
        Task<TaskItemResponse> ReceiveTasksAsync(QueryOptions options);
    }
}
