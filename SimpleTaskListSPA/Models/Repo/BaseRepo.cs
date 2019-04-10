using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SimpleTaskListSPA.Data;

namespace SimpleTaskListSPA.Models.Repo
{
    //базовый класс хранилища
    //используется для взаимодействия с базой данных с помощью CRUD операций
    public class BaseRepo<T> : IBaseRepo<T>, IDisposable where T : EntityBase
    {
        protected readonly DataContext context;

        public BaseRepo(DataContext ctx) => context = ctx;

        //ссылка на контекст бд
        protected DataContext Context => context;

        public void Dispose() => Context?.Dispose();

        public IQueryable<T> GetEntities()
        {
            if (Context.Database.GetAppliedMigrations().Count() > 0)
            {
                return Context.Set<T>();
            }

            return null;
        }

        //создать запись в бд
        public async Task<T> AddAsync(T entity)
        {
            await Context.AddAsync(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        //обновить запись в бд
        public async Task<bool> UpdateAsync(T entity)
        {
            long id = entity.Id;
            bool isExist = EntityExist(id);
            if (!isExist)
            {
                return false;
            }
            Context.Update<T>(entity);

            await Context.SaveChangesAsync();

            return true;
        }

        //удалить запись в бд по id
        public async Task<bool> DeleteAsync(T entity)
        {
            long id = entity.Id;
            bool isExist = EntityExist(id);
            if (!isExist)
            {
                return false;
            }
            Context.Remove(entity);

            await Context.SaveChangesAsync();

            return true;
        }

        private bool EntityExist(long id) => Context.Set<T>().Any(e => e.Id == id);
    }
}
