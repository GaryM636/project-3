import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import './bio.css'

function BioLayout() {
    const userId = Auth.getProfile().data._id

    const { data, loading } = useQuery(QUERY_ME);

    const bio = data?.me || {};
    console.log("Bio: ", bio);

    if (loading) {
        return <h3>No bio yet</h3>
    }

    return (
        <>
            <div>
                <h1 id="username">{bio.username}</h1>
                <ul id="bioList">
                    <li className="listData">About:
                        <p>
                            {bio.bio.text}
                        </p>
                    </li>
                    <li className="listData">Location:
                        <p>
                            {bio.bio.location}
                        </p>
                    </li>
                    <li className="listData">Website:
                        <Link sx={{ textDecoration: "none" }} to={`${bio.bio.website}`} target="_blank">
                            <p id="linkTag">
                                Here
                            </p>
                        </Link>
                    </li>
                    <li className="listData">Birthday:
                        <p>
                            {bio.bio.birthday}
                        </p>
                    </li>
                </ul>
            </div>











            {/* <div className="bioContent">
                <h3 className="bioHeaders">About: </h3>
                <p>{bio.bio.text}</p>
            </div>
            <div className="bioContent">
                <h3 className="bioHeaders">Location: </h3>
                <p>{bio.bio.location}</p>
            </div> */}


            {/* <Card className="cards" >
                <CardContent id="bioCard">
                    <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
                        Username:
                        <Typography sx={{ml: "15%"}}>
                            {bio.username}
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>
            <Card className="cards" >
                <CardContent id="bioCard">
                    <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
                        About:
                        <Typography sx={{ml: "15%"}}>
                            {bio.bio.text}
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>

            <Card className="cards" >
                <CardContent id="bioCard">
                    <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
                        Location:
                        <Typography sx={{ml: "15%"}}>
                            {bio.bio.location}
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>
            <Card className="cards" >
                <CardContent id="bioCard">
                </CardContent>
                <Typography sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    Website:
                    <Typography sx={{ml: "15%"}}>
                        {bio.bio.website}
                    </Typography>
                </Typography>
            </Card>
            <Card className="cards" >
                <CardContent id="bioCard">
                    <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
                        Birthday:
                        <Typography sx={{ml: "15%"}}>
                            {bio.bio.birthday}
                        </Typography>
                    </Typography>
                </CardContent>
            </Card> */}
            <Link id="editBio" to="/editBio">
                <Typography sx={{ textDecoration: "none" }} variant="text">
                    <Button>Edit Bio</Button>
                </Typography>
            </Link>
        </>
    )
};


export default BioLayout;