import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Input, Form, Label, Button } from "reactstrap";
import { addPost } from "../../modules/postManager";
import { FormGroup } from "reactstrap";
// import { getAllCategories } from "../../modules/categoryManager";
import { getPostById } from "../../modules/postManager.js";


export const PostForm = () => {
    const [post, setPost] = useState({
            title: "",
            content: "",
            imageLocation: "",
            createDateTime: "",
            publishDateTime: "",
            isApproved: true,
            categoryId: 0,
            
    })





    const [categories, setCategories] = useState([])
    useEffect(() => {
        // getAllCategories().then(setCategories)
    }, [])


    var history = useHistory();


    const handleInputChange = (event) => {
        // This is needed because a form will always refresh your page when a button is clicked.
        event.preventDefault()
        const value = event.target.value
        const key = event.target.id
        // I am creating a copy of the empy post state that then gets modified with the users input.
        const postCopy = {...post}
        postCopy[key] = value
        setPost({
            title: postCopy.title,
            content: postCopy.content,
            imageLocation: postCopy.imageLocation,
            publishDateTime: postCopy.publishDateTime,
            isApproved: postCopy.isApproved,
            // categoryId: parseInt(postCopy.categoryId),
            categoryId: 1
    })
    }

    const handleSave = (event) => {
        event.preventDefault()
        addPost(post).then(() => history.push(`/myPosts`))
    }

    console.log("post id", post.id);

    // .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    return (

        <>
        {console.log(categories)}
        {console.log(post)}
        <Form>
            <h1>Post Form</h1>
            <FormGroup>
                <Label for = "title">Title</Label>
                <Input type = "text" name = "title" id = "title" placeholder = "Post Title" value = {post.title} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for = "content">Content</Label>
                <Input type = "text" name = "content" id = "content" placeholder = "Post Content" value = {post.content} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for = "imageLocation">Image Location</Label>
                <Input type = "text" name = "imageLocation" id = "imageLocation" placeholder = "Image URL" value = {post.imageLocation} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for = "publishDateTime">Publish on...</Label>
                <Input type = "datetime-local" name = "publishDateTime" id = "publishDateTime" value = {post.publishDateTime} onChange={handleInputChange}/>
            </FormGroup>
            {/* <FormGroup>
                <Label for = "title">Approval?</Label>
                <Input type = "checkbox" name = "isApproved" id = "isApproved" value = {post.isApproved} onChange={handleInputChange}/>
            </FormGroup> */}
            <FormGroup>
                <Label for = "categoryId">Category</Label>
                <select  name="categoryId" id="categoryId" onChange={handleInputChange}>
                     {/* <option value="0">Select a Category</option>{categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))} */}
                </select>
            </FormGroup>
            <Button onClick={handleSave}>Submit</Button>
        </Form>



        </>
    )
}

export default PostForm;