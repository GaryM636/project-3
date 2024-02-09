import React from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import './style.css';

function CommentForm() {
    return (
    <FormControl id="comment-form" >
        <InputLabel htmlFor="component-outlined">Comment</InputLabel>
        <OutlinedInput
          id="component-outlined"
          label="comment"
        />
      </FormControl>
    );
};

export default CommentForm;