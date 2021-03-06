import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { addComment } from "../../modules/commentManager.js";
import { getPostById } from "../../modules/postManager.js";
import { Button, Label, Input } from 'reactstrap';

const CommentForm = () => {

    const [comment, setComment] = useState({
        subject: "",
        content: "", 
        //userProfileId: 0, // generated by backend
        postId: 0,
        //createDateTime: "" // generated by backend along with comment id
    });

    const [post, setPost] = useState({});

    // const { commentId } = useParams();
    const {id} = useParams();
	const history = useHistory();

    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);
    
    console.log('post', post);

    const handleInputChange = (event) => {
        const newComment = { ...comment }
          newComment[event.target.id] = event.target.value
          setComment(newComment)
    }

    const handleSaveComment = () => {
        console.log('firebaseUserId',sessionStorage.getItem("firebaseUserId"));
        if (comment.subject === "" || comment.content === "") {
            alert("Please enter values for both fields!")  
        } else {
            const newComment = {
                subject: comment.subject,
                content: comment.content,               
                //userProfileId: parseInt(comment.userProfileId), // generated by backend
                postId: parseInt(post.id)
                //createDateTime: new Date().toLocaleString() or new Date().toISOString()// generated by backend along with comment id                        
            }
            addComment(newComment)
            .then(() => history.push(`/post/${post.id}/comments`))
        }
    };
    
    console.log('comment', comment);

    return (
        <>
            <div className="container commentFormContainer">
                <h3>~Add New Comment~</h3>
                <div className="commentForm">
                    <br/><Label>Subject:</Label><br/><br/>
                    <Input id="subject" type="text" defaultValue={comment.subject} value={comment.subject} onChange={(event) => {handleInputChange(event)}} placeholder="comment subject..." required />
                    <br/><br/><Label>Content:</Label><br/><br/>
                    <Input id="content" type="text" defaultValue={comment.content} value={comment.content} onChange={(event) => {handleInputChange(event)}} placeholder="comment content..." required />
                    <br/><br/><Button className="btn btn-primary" value ="Add New Video" onClick={() => {handleSaveComment()}}>Save Comment</Button><br/><br/>
                    <Button className="returnBtn" onClick={() => history.goBack()}>Cancel</Button>
                </div>
            </div>
        </>
    )
}

export default CommentForm;