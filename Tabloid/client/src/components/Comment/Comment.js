import React from "react";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment }) => {
  return (
    <div>
        <Card>
            <CardBody>
                <h2>Post Title: {comment.post.title}</h2>
                <p>Subject: {comment.subject}</p>
                <p>Content: {comment.content}</p>
                <p>Commented By: {comment.userProfile.displayName}</p>
                <p>Comment Date: {comment.createDateTime}</p>
                {/* <p>Comment Date: {new Date().toLocaleDateString()}</p> */}
            </CardBody>
        </Card>
    </div>
  );
};

export default Comment;