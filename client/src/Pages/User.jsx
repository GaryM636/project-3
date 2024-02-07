import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PostsList from '../Components/PostsList';

import { QUERY_USER } from '../utils/queries';

const User = () => {
    const { userId } = useParams();

    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId },
    });

    const user = data?.user || {};

    return (
    <>
        {/* user info card to display username, follow data, bio */}
        <div>
            <h2>
                {user.username}
            </h2>
            <div>
                <h3>Bio:</h3>
                <p>{user.bio}</p>
            </div>
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
        </div>

        {/* display all existing user's posts (pass in PostsList component for individual post cards) */}
        { user.posts?.length > 0 && <PostsList posts={user.posts} /> }

    </>
    );
};

export default User;