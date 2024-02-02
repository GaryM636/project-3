import { gql } from '@apollo/client';

// User
export const QUERY_USERS = gql`
query getAllUsers {
  getAllUsers {
    username
    password
    _id
    email
  }
}
`;

export const QUERY_USER = gql`
query getUser($userId: ID) {
  getUser(userId: $userId) {
    _id
    username
    password
    email
    posts {
      _id
      text
    }
  }
}
`;

// Post
export const QUERY_POSTS = gql`
query getAllPosts {
  getAllPosts {
    _id
    text
    userId {
      username
    }
  }
}
`;

export const QUERY_POST = gql`
query getPost($postId: ID) {
  getPost(postId: $postId) {
    _id
    text
    userId {
      username
    }
  }
}
`;