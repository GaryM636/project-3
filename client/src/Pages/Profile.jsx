import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';


import ProfileImg from '../Components/Images/ProfileImages';
import InfoBody from '../Components/InfoBody';
import Auth from '../utils/auth';

const Profile = () => {
    const userId = Auth.getProfile().data._id
    console.log("Profile userId: ", userId);
    

    const { data } = useQuery(QUERY_ME, { fetchPolicy: "cache-and-network" });
    console.log("profile data: ", data);

    const user = data?.Me || {};
    console.log("Profile user: ", user);

    return (
        <>
        <ProfileImg />
        <InfoBody userId={userId} />
        </>
    );
}

export default Profile;