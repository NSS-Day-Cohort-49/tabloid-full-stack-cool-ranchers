import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { getPostById } from "../../modules/postManager";
import { Button } from "reactstrap";

const PostDetail = () => {
  
  const [post, setPost] = useState({});
  const {id} = useParams();

  const history = useHistory();

  useEffect(() => {
    getPostById(id).then(setPost);
  }, []);

  // if (!post) {
  //   return null;
  // }

  
  return (
    <ListGroup >
      <h1>Post Details:</h1><br/>
      <ListGroupItem>
        <h3>{post.title}</h3>
        <p>{post.publishDateTime}</p>
        {/* <p>{new Date().toLocaleDateString()}</p> */}
      </ListGroupItem>
      <ListGroupItem>
        <img src={post.imageLocation} />
      </ListGroupItem>
      <ListGroupItem>
        <p>Author: {post.userProfile?.displayName}</p>
      </ListGroupItem>
      <ListGroupItem>
        <p>Category: {post.category?.name}</p>
      </ListGroupItem>
      <ListGroupItem>
        <p>{post.content}</p>
      </ListGroupItem>
      <Button onClick={() => {history.push(`/post/${id}/comments`)}}>View Comments</Button><br/>
      <Button onClick={() => {history.push(`/post/${id}/create`)}}>Add Comment</Button>
    </ListGroup>
  );
};

export default PostDetail;
