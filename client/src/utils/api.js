// User 
export const getAllUsers = () => {
    return fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  export const getUser = (userId) => {
    return fetch(`/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

// Post
export const getAllPosts = () => {
    return fetch('/api/post', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  export const getPost = (postId) => {
    return fetch(`/api/post/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  export const createPost = (postData) => {
    return fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

// Comment
export const createComment = (commentData) => {
  return fetch('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
};
