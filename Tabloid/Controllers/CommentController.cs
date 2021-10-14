using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Microsoft.AspNetCore.Authorization;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
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
    }
}
