import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { getPostById } from "../../modules/postManager";

const PostDetail = () => {
  
  const [post, setPost] = useState({});
  const {id} = useParams();

  useEffect(() => {
    getPostById(id).then(setPost);
  }, []);

  // if (!post) {
  //   return null;
  // }
  
  return (
    <ListGroup >
      <ListGroupItem>
        <h3>{post.title}</h3>
        <p>{post.publishDateTime}</p>
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
    </ListGroup>
  );
};

export default PostDetail;
