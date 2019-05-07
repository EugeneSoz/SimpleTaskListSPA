using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleTaskListSPA.Data;
using SimpleTaskListSPA.Data.DTO;
using SimpleTaskListSPA.Models.Repo;

namespace SimpleTaskListSPA.Controllers
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryRepo _repo;

        public CategoryController(ICategoryRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("category/{id}")]
        public async Task<Category> GetCategoryAsync(long id)
        {
            Category category = await _repo.GetCategoryAsync(id);

            return category;
        }

        [HttpGet("categories")]
        public async Task<List<CategoryResponse>> GetCategoriesAsync()
        {
            List<CategoryResponse> categories;
            try
            {
                categories = await _repo.GetCategoriesAsync();
            }
            catch (Exception)
            {
                categories = null;
            }
            
            return categories;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateCategoryAsync([FromBody] Category category)
        {
            return await CreateAsync(category, _repo.AddAsync);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateCategoryAsync([FromBody] Category category)
        {
            return await UpdateAsync(category, _repo.UpdateAsync);
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteCategoryAsync([FromBody] Category category)
        {
            return await DeleteAsync(category, _repo.DeleteAsync);
        }
    }
}
