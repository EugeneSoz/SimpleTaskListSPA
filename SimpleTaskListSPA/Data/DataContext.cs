using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SimpleTaskListSPA.Data
{
    //класс, необходимый для подключения к базе данных
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //таблица задач в бд
        public DbSet<TaskItem> Tasks { get; set; }

        //таблица списка задач в бд
        public DbSet<Category> Categories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>().Property(t => t.IsOverdue)
                .HasComputedColumnSql(@"
	                CAST(CASE
		                WHEN CONVERT(date, PlanningDate) < CONVERT(date, GETDATE()) THEN 1
		                WHEN PlanningDate IS NULL THEN 0
		                WHEN CONVERT(date, PlanningDate) >= CONVERT(date, GETDATE()) THEN 0
	                END AS BIT)");
        }
    }
}
