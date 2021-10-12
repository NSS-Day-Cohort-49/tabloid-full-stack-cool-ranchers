import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Post = ({ post }) => {
  return (
    <Card >
      <CardBody>
        <h3>{post.title}</h3>
      </CardBody>
      <CardBody>
        <p>Author: {post.userProfile.displayName}</p>
      </CardBody>
      <CardBody>
        <p>Category: {post.category.name}</p>
      </CardBody>
    </Card>
  );
};

export default Post;
