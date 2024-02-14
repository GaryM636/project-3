import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../utils/mutations';

const BottomNav = ({ handleAccordionChange, isCommentActive, canDelete, postId, refetchPosts }) => {
  const [value, setValue] = React.useState('comments');
  const [deletePost] = useMutation(DELETE_POST);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = async () => {
    try {
      // Perform mutation to delete the post
      await deletePost({
        variables: { postId }
      });
      // Update UI after successful deletion
      refetchPosts(); // Trigger the function to refetch the posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <BottomNavigation sx={{ width: 1 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Add Comment"
        value="add comment"
        icon={<AddCommentIcon />}
        onClick={handleAccordionChange}
      />
      {canDelete && (
        <BottomNavigationAction
          label="Delete"
          value="delete"
          icon={<DeleteForeverIcon />}
          onClick={handleDelete}
        />
      )}
    </BottomNavigation>
  );
}

export default BottomNav;
