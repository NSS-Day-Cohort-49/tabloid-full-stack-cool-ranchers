import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Post/PostList";
import UserPostList from "./Post/UserPostList";
import PostDetail from "./Post/PostDetail";
import { PostForm } from "./Post/PostForm";
import CommentList from "./Comment/CommentList";
import TagList from "./Tag/TagList";

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myPosts">
          {isLoggedIn ? <UserPostList /> : <Redirect to="/login" />}
        </Route>
        
        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/add">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
          </Route>
          
        <Route path="/post/:id/comments">
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}

        </Route>
        <Route path="/tags">
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
