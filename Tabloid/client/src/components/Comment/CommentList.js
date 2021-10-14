import React, { useEffect, useState } from "react";
import Comment from './Comment';
import { getCommentsFromPost} from "../../modules/commentManager";
import { useParams } from "react-router-dom";

const CommentList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [comments, setComments] = useState([]);

  const {id} = useParams();

  const getPostComments = (id) => {
    getCommentsFromPost(id).then(comments => setComments(comments));
  };

  useEffect(() => {
    getPostComments(id);
  }, []);


  return (
    <div>
        <div className="container">
            <h1>Post Comments:</h1>
            <div className="container justify-content-center">
                {console.log(comments)}
                {comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default CommentList;

