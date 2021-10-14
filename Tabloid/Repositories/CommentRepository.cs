using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Microsoft.Data.SqlClient;
using Tabloid.Utils;
using Microsoft.Extensions.Configuration;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        // Get All Comments
        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, PostId, UserProfileId, Subject, Content, CreateDateTime FROM Comment";

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(new Comment
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),                          
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                        });
                    }

                    reader.Close();
                    return comments;
                }
            }
        }

        // Get All Comments From A Post:
        public List<Comment> GetCommentsFromPost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select  c.Id [CommentId], 
		                                        c.PostId,
		                                        c.UserProfileId,
		                                        c.Subject,
		                                        c.Content,
		                                        c.CreateDateTime [Comment Creation],
		                                        up.Id [userProfileId],
		                                        up.DisplayName,
                                                p.Id [postId],
                                                p.Title
                                        FROM Comment c
                                        INNER JOIN UserProfile up ON c.UserProfileId = up.Id
                                        LEFT JOIN Post p ON c.PostId = p.Id 
                                        WHERE c.PostId = @id
                                        ORDER BY c.CreateDateTime DESC";
                    cmd.Parameters.AddWithValue("@id", postId);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(new Comment
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "Comment Creation"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "postId"),
                                Title = DbUtils.GetString(reader, "Title"),
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "userProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            }
                        });
                    }

                    reader.Close();
                    return comments;
                }
            }
        }
    }
}
