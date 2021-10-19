using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        //https://localhost:5001/api/tag/
        [HttpGet]
        public IActionResult Get()
        {
            var tags = _tagRepository.GetAllTags();
            return Ok(tags);
        }

        [HttpPost]
        public IActionResult Tag(Tag tag)
        {
            _tagRepository.AddTag(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }


    }
}
