import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';


import ProfileImg from '../Components/Images/ProfileImages';
import InfoBody from '../Components/InfoBody';
import Auth from '../utils/auth';

import Box from '@mui/material/Box';

const Profile = () => {
    const userId = Auth.getProfile().data._id;
    
    const { data } = useQuery(QUERY_ME, { fetchPolicy: "cache-and-network" });

    const user = data?.me || {};

    return (
        <>
        <ProfileImg />
        <InfoBody user={user} />
        </>
    );
}

export default Profile;