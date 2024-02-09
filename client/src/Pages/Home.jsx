import React from "react";
import PostWithImg from "../Components/SinglePost/PostWithImg.jsx";
import PostWoImg from "../Components/SinglePost/PostWoImg.jsx";

function Home() {
    return (
        <>
            <h1>HOME</h1>
            <div className="home-render">
            <PostWithImg />
            <PostWoImg />
            </div>
        </>
    );
};

export default Home;