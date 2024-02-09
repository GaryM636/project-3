import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BottomNav from '../PostBottomNav/index.jsx';

const PostsList = () => {
    const { data, loading } = useQuery(QUERY_POSTS);

    const posts = data?.getAllPosts || [];
    console.log(posts)

    if (loading) {
        return <h3>No Posts Yet</h3>;
    }

    return (
      <>
        { posts.map((post) => (
         <Card className='cards' key={post._id}>
         <CardContent>
           <Typography variant="body2" color="text.secondary">
             {post.text}
           </Typography>
         </CardContent>
         <CardActions className='card-actions'>
           <BottomNav />
         </CardActions>
       </Card>
        ))}
      </>
    )
}

export default PostsList;