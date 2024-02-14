import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import { DELETE_POST } from "../../utils/mutations";
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
import { Link } from 'react-router-dom';

import '../PostsList/post.css';

const PostsList = () => {
  const userId = Auth.getProfile().data._id
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const { data, loading, refetch } = useQuery(QUERY_POSTS, { fetchPolicy: "cache-and-network" });
  const [deletePost] = useMutation(DELETE_POST);

  useEffect(() => {
    if (data && data.getAllPosts) {
      setPostsData(data.getAllPosts);
    }
  }, [data]);

  if (loading) {
    return <h3>Loading Posts...</h3>;
  }

  const handleAccordionChange = (postId) => {
    setActiveAccordion(activeAccordion === postId ? null : postId);
  };

  const canDelete = (postId) => {
    return userId === postId;
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost({
        variables: { postId }
      });
      refetch(); // Refetch posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      {postsData.toReversed().map((post) => (
        <Card className='cards' key={post._id} sx={{ minWidth: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "800" }} variant="body2" color="text.secondary">
                <Link to={`/users/${post.userId._id}`}> {post.userId.username} </Link>
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
            <BottomNav
              handleAccordionChange={() => handleAccordionChange(post._id)}
              isCommentActive={activeAccordion === post._id}
              canDelete={canDelete(post.userId._id)}
              postId={post._id}
              onDelete={() => handleDelete(post._id)}
              refetchPosts={refetch}
            />
          </CardActions>
          <Accordion expanded={activeAccordion === post._id}>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <Typography>Comments</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CommentForm postId={post._id} userId={userId} />
              <Typography>
                {post.comments.map((comment) => (
                  <Box key={comment._id} sx={{ border: "1px solid #d3d3d3", borderRadius: "3px", padding: "5px", marginBottom: "5px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "800" }} variant="body2" color="text.secondary">
                        <Link to={`/users/${comment.userId._id}`}>{comment.userId.username}</Link>
                      </Typography>
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
