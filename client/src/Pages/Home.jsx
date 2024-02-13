import React from "react";
import PostsList from "../Components/PostsList/index.jsx"
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Auth from '../utils/auth';


function Home() {
 
    return (
        <>
        {!Auth.loggedIn() && window.location.replace("/login")}
            <h1>HOME</h1>
            <div className="home-render">
                <PostsList />
                <Link to="/createPost" state = {{userId: Auth.getProfile().data._id }}>
                    <Fab id="postCreate" color="primary" aria-label="add">
                        <AddIcon id="postCreateBtn" />
                    </Fab>
                </Link>
            </div>
        </>
    );
};

export default Home;