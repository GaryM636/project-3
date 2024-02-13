import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BottomNav from '../PostBottomNav/index.jsx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CommentForm from '../CommentForm/index.jsx';

const PostsList = () => {
  const [isCommentActive, setIsCommentActive] = React.useState(false);

  const { data, loading } = useQuery(QUERY_POSTS, {fetchPolicy: "cache-and-network"});


  const posts = data?.getAllPosts || [];
  console.log(posts)

  if (loading) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <>
      {posts.toReversed().map((post) => (
        <Card className='cards' key={post._id} sx={{
          minWidth: 1,
        }}>
          <CardContent>
            <Typography sx={{textAlign: "left", fontWeight: "800"}} variant="body2" color="text.secondary">
              {post.userId.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.text}
            </Typography>
            <Typography sx={{textAlign: "right", fontWeight: "400"}} variant="body2" color="text.secondary">
              {post.createdAt}
            </Typography>
          </CardContent>
          <CardActions className='card-actions'>
            <BottomNav setIsCommentActive={setIsCommentActive} isCommentActive={isCommentActive} />
          </CardActions>
          <Accordion expanded={isCommentActive}>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Comments</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CommentForm />
              <Typography>
                {/* this is where we need to render comments */}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </>
  )
}

export default PostsList;