using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SimpleTaskListSPA.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class BaseController : ControllerBase
    {
        public async Task<ActionResult> CreateAsync<T>(T entity, Func<T, Task> addMethod)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }
            try
            {
                await addMethod?.Invoke(entity);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $@"Невозможно создать запись: {ex.Message}");
                return BadRequest(ModelState);
            }

            return Created("", entity);
        }

        public async Task<ActionResult> UpdateAsync<T>(T entity, Func<T, Task<bool>> editMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool isOk;
            try
            {
                isOk = await editMethod?.Invoke(entity);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $@"Невозможно сохранить запись: {ex.Message}");
                return BadRequest(ModelState);
            }

            if (!isOk)
            {
                return NotFound();
            }
            return Ok();
        }

        public async Task<ActionResult> DeleteAsync<T>(T entity, Func<T, Task<bool>> deleteMethod)
        {
            bool isOk;

            try
            {
                isOk = await deleteMethod?.Invoke(entity);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $@"Невозможно удалить запись: {ex.Message}");
                return BadRequest(ModelState);
            }

            if (!isOk)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
