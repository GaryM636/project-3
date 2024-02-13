import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS, QUERY_COMMENTS } from "../../utils/queries";
import { CREATE_COMMENT } from "../../utils/mutations.js";
import { useState } from "react";
import { useLocation } from 'react-router-dom';


import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BottomNav from '../PostBottomNav/index.jsx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Auth from '../../utils/auth';

import '../PostsList/post.css';

const PostsList = () => {
  const userId = Auth.getProfile().data._id
  console.log("userId on postList: ",  userId)
  
  const { data, loading } = useQuery(QUERY_POSTS);
  const [text, setText] = useState("");
  const [addComment, { error }] = useMutation(CREATE_COMMENT);

  const posts = data?.getAllPosts || [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addComment({
        variables: { text, userId, postId }
      })
      setText('');
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <>
      {posts.map((post) => (
        // Post Content Section
        <Card id="cardContainer" className='cards' key={post._id}>
          <CardContent id="CardBody">
            <Typography id="CardContent" variant="body2" color="text.secondary">
              {post.text}
            </Typography>
          </CardContent>
          <CardActions id="cardBottom" className='card-actions'>
            <BottomNav />
          </CardActions>
          {/* Add Comments Section */}
            <Accordion>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Comments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="form" noValidate onSubmit={() => handleSubmit(post._id)} sx={{ mt: 3, width: "525px" }}>
                  <Grid container maxWidth="md" spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        multiline={true}
                        rows={3}
                        required
                        fullWidth
                        name="text"
                        label="Comment"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Create
                    </Button>
                  </Grid>
                  {/* Comment Grid */}
                  {post.comments.map((comment) => (
                    <Grid container maxWidth="md" spacing={2} key={comment._id}>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                      <Typography>{comment.text}</Typography>
                      <Typography>User: {comment.userId.username}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      
                    </Grid>
                  </Grid>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion> 
        </Card >
      ))}
    </>
  )
}

export default PostsList;