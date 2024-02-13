import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";



import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BottomNav from '../PostBottomNav/index.jsx';
import Box from '@mui/material/Box';
import CommentForm from '../CommentForm/index.jsx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Auth from '../../utils/auth';

import '../PostsList/post.css';


const PostsList = () => {
  const userId = Auth.getProfile().data._id
  const [isCommentActive, setIsCommentActive] = React.useState(false);

  const { data, loading } = useQuery(QUERY_POSTS, { fetchPolicy: "cache-and-network" });

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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "800" }} variant="body2" color="text.secondary">
                {post.userId.username}
              </Typography>
              <Typography sx={{ fontWeight: "400" }} variant="body2" color="text.secondary">
                {post.createdAt}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {post.text}
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
              <CommentForm postId={post._id} userId={userId} />
              <Typography>
                {post.comments.map((comment) => (
                  <Box key={comment._id} sx={{
                    border: "1px solid #d3d3d3",
                    borderRadius: "3px",
                    padding: "5px",
                    marginBottom: "5px",
                  }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "800" }} variant="body2" color="text.secondary">{comment.userId.username}</Typography>
                      <Typography sx={{ fontWeight: "400" }} variant="body2" color="text.secondary">{comment.createdAt}</Typography>
                    </Box>
                    <Typography key={comment._id}>{comment.text} </Typography>
                  </Box>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </>
  )
}


export default PostsList;