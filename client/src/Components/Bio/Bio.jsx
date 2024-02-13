import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import BioForm from './index';

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

            <Card className="cards" >
                <CardContent id="bioCard">
                    <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
                        Username:
                        <Typography>
                            {bio.username}
                        </Typography>
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
                        About:
                        <Typography>
                            {bio.bio.text}
                        </Typography>
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
                        Location:
                        <Typography>
                            {bio.bio.location}
                        </Typography>
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
                        Website:
                        <Typography>
                            {bio.bio.website}
                        </Typography>
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
                        Birthday: 
                        <Typography>
                            {bio.bio.birthday}
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>

            <Link to="/editBio">
                <Typography sx={{textDecoration: "none"}} variant="text">
                    <Button>Edit Bio</Button>
                </Typography>
            </Link>
        </>
    )
};


export default BioLayout;