using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        [Required(ErrorMessage = "Hmmm... You should really add a Subject...")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Please provide a content for your comment! :)")]
        public string Content { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}
