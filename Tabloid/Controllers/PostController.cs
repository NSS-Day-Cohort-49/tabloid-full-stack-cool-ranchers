using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;
namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

        //https://localhost:5001/api/post/
        [HttpGet]
        public IActionResult Get()
        {
            var posts = _postRepository.GetAll();
            var filteredPosts = posts.Where(post => post.PublishDateTime < DateTime.Now);
            return Ok(filteredPosts);
        }

        private string GetCurrentUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }



        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            _postRepository.AddPost(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }




        //https://localhost:5001/api/post/myPosts
        [HttpGet("myPosts")]
        public IActionResult GetCurrentUserPosts()
        {
            string fireBaseId = GetCurrentUserProfileId();
            var currentUser = _userProfileRepository.GetByFirebaseUserId(fireBaseId);
            var myPosts = _postRepository.GetPostByCurrentUser(currentUser.Id);
            return Ok(myPosts);
        }

        //https://localhost:5001/api/post/id
        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = _postRepository.GetPostById(id);
            return Ok(post);
        }
    }
}
