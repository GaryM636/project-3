import React from "react";
import { useState } from "react";
import { QUERY_POSTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../utils/mutations.js";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

import './style.css';

function CommentForm({ postId, userId }) {
  const [text, setText] = useState("");
  const [addComment, { error }] = useMutation(CREATE_COMMENT, {refetchQueries: [QUERY_POSTS, "getAllPosts"]});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addComment({
        variables: { userId, text, postId }
      });
      console.log("Data: ", data)
      setText('');
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <FormControl id="comment-form" >
        <InputLabel htmlFor="component-outlined">Comment</InputLabel>
        <OutlinedInput
          id="component-outlined"
          label="comment"
          required
          fullWidth
          name="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default CommentForm;