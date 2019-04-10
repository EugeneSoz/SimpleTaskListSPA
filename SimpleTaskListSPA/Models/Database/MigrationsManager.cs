using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;

namespace SimpleTaskListSPA.Models.Database
{
    //класс для программного управления миграциями бд
    public class MigrationsManager
    {
        //классы, производные от DbContext
        private readonly IEnumerable<Type> contextTypes;
        private readonly IServiceProvider provider;

        public MigrationsManager(IServiceProvider prov)
        {
            provider = prov;
            contextTypes = provider.GetServices<DbContextOptions>().Select(o => o.ContextType);
            ContextNames = contextTypes.Select(t => t.FullName);
            ContextName = ContextNames.First();
        }
        public string ContextName { get; set; }
        public DbContext Context => provider.GetRequiredService(Type.GetType(ContextName)) as DbContext;
        public IEnumerable<string> ContextNames { get; private set; }
        public IEnumerable<string> AppliedMigrations => Context.Database.GetAppliedMigrations();
        public IEnumerable<string> PendingMigrations => Context.Database.GetPendingMigrations();
        public IEnumerable<string> AllMigrations => Context.Database.GetMigrations();

        public void Migrate(string contextName, string target = null)
        {
            ContextName = contextName;
            Context.GetService<IMigrator>().Migrate(target);
        }
    }
}
