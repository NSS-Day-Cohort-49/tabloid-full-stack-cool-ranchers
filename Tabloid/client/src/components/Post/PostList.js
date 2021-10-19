import React, { useEffect, useState } from "react";
import Post from './Post';
import { getAllPosts} from "../../modules/postManager";

const PostList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [posts, setPosts] = useState([]);



  const getPosts = () => {
    getAllPosts().then(posts => setPosts(posts));
  };

  useEffect(() => {
    getPosts();
  }, []);


  return (
    <div>
        <br/>
        <div className="container">
            <div className="container justify-content-center">
                {console.log(posts)}
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default PostList;

