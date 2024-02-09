import React from "react";
import PostWithImg from "../Components/SinglePost/PostWithImg.jsx";
import PostWoImg from "../Components/SinglePost/PostWoImg.jsx";
import PostForm from "../Components/PostForm/index.jsx";
import PostsList from "../Components/PostsList";

function Home() {
    return (
        <>
            <h1>HOME</h1>
          <PostForm />
            <div className="home-render">

            <PostWithImg />
            <PostWoImg />
            <PostsList />
            </div>
        </>
    );
};

export default Home;