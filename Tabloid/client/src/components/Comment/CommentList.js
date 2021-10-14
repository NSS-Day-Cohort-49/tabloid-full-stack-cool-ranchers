import React, { useEffect, useState } from "react";
import Comment from './Comment';
import { getCommentsFromPost} from "../../modules/commentManager";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const CommentList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [comments, setComments] = useState([]);

  const {id} = useParams();
  const history = useHistory();

  const getPostComments = (id) => {
    getCommentsFromPost(id).then(comments => setComments(comments));
    // getCommentsFromPost(id).then(data => console.log(data));
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
                {comments.length !== 0 ?
                comments.map((comment) => {
                    return <Comment comment={comment} key={comment.id} />})
                    :
                    <p>No Comments Yet</p>
                }
            </div>
            <br/>
            <Button onClick={() => {history.push(`/post/${id}`)}}>Return to Post</Button>
        </div>
    </div>
  );
};

export default CommentList;

