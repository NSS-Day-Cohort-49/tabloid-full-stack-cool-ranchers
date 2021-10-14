using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Microsoft.AspNetCore.Authorization;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }

        //https://localhost:5001/api/comment/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAllComments());
        }

        //https://localhost:5001/api/comment/postComments/id
        [HttpGet("postComments/{id}")]
        public IActionResult GetPostComments(int id)
        {
            var postComments = _commentRepository.GetCommentsFromPost(id);
            if (postComments == null)
            {
                return NotFound();
            }
            return Ok(postComments);
        }

        private string GetCurrentUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }

        //https://localhost:5001/api/comment
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            try
            {
                //string fireBaseId = GetCurrentUserProfileId();
                //var currentUser = _userProfileRepository.GetByFirebaseUserId(fireBaseId);
                //comment.UserProfileId = currentUser.Id;

                comment.CreateDateTime = DateTime.Now;

                _commentRepository.CreateComment(comment);

                return CreatedAtAction("Get", new { id = comment.Id }, comment);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }
    }
}
