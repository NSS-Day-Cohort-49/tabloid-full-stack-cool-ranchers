using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        void AddTag(Tag tag);
        //Tag GetTagById(int id);
        //void DeleteTag(int id);
        //void UpdateTag(Tag tag);
        //List<Tag> GetTagsByPost(int postId);
        //void AddPostTag(int id, int postId);
        //void DeletePostTag(int id, int postId);

    }
}