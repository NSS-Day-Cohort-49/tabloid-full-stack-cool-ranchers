using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Tabloid.Models;
using Tabloid.Repositories;
namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        //https://localhost:5001/api/post/
        [HttpGet]
        public IActionResult Get()
        {
            var posts = _postRepository.GetAll();
            var filteredPosts = posts.Where(post => post.PublishDateTime < DateTime.Now);
            return Ok(filteredPosts);
        }
    }
}
