import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function BottomNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      />
    </BottomNavigation>
  );
}