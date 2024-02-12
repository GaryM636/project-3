import React from "react";
import PostsList from "../Components/PostsList/index.jsx"
import PostWithImg from "../Components/SinglePost/PostWithImg.jsx";
import PostWoImg from "../Components/SinglePost/PostWoImg.jsx";
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import Auth from '../utils/auth';


function Home() {
    const { data, loading, error } = useQuery(QUERY_ME);
    const userData = data?.me || {};

    if (error) {
        <div>{error.message}</div>
    }

    if (loading) {
        <div>Loading....</div>
    }
    return (
        <>
        {!Auth.loggedIn() && window.location.replace("/login")}
            <h1>HOME</h1>
            <div className="home-render">
                <PostsList />
                <Link to="/createPost" state = {{userId: userData._id }}>
                    <Fab id="postCreate" color="primary" aria-label="add">
                        <AddIcon id="postCreateBtn" />
                    </Fab>
                </Link>
            <PostsList />
            </div>
        </>
    );
};

export default Home;