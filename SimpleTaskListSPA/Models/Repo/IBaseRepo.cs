using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTaskListSPA.Models.Repo
{
    public interface IBaseRepo<T>
    {
        IQueryable<T> GetEntities();
        Task<T> AddAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> DeleteAsync(T entity);
    }
}
