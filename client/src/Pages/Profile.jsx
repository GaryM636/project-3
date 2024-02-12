import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useParams } from 'react-router-dom';
import ProfileImg from '../Components/Images/ProfileImages';
import InfoBody from '../Components/InfoBody';

const Profile = () => {
    const { userId } = useParams();

    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId },
    });

    const user = data?.user || {};

    return (
        <>
        <ProfileImg />
        <InfoBody user={user} />
        </>
    );
}

export default Profile;