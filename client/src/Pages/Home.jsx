import React from "react";
import PostWithImg from "../Components/SinglePost/PostWithImg.jsx";
import PostWoImg from "../Components/SinglePost/PostWoImg.jsx";
import PostsList from "../Components/PostsList/index.jsx";

function Home() {
    return (
        <>
            <h1>HOME</h1>
            <div className="home-render">
            <PostWithImg />
            <PostWoImg />
            <PostsList />
            </div>
        </>
    );
};

export default Home;