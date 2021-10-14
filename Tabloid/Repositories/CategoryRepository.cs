using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class CategoryRepository: BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * 
                        FROM Category
                        ORDER BY Name";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(newCategory(reader));
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        public Category GetCategoryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Name, Id
                         FROM Category
                        WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Category category = null;

                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        };
                    }

                    reader.Close();

                    return category;
                }
            }
        }

        private Category newCategory(SqlDataReader reader)
        {
            throw new NotImplementedException();
        }
    }
}
