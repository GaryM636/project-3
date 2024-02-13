import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


import ProfileImg from '../Components/Images/ProfileImages';
import InfoBody from '../Components/InfoBody';
import Auth from '../utils/auth';

const viewUserProfile = () => {
    const userId = Auth.getProfile().data._id
    console.log("Profile userId: ", userId);
    

    const { data } = useQuery(QUERY_USER, { fetchPolicy: "cache-and-network" });
    console.log("profile data: ", data);

    const user = data?.Me || {};
    console.log("visit user: ", user);

    return (
        <>
        <ProfileImg />
        <InfoBody userId={userId}  />
        </>
    );
}

export default viewUserProfile;