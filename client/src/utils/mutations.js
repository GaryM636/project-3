import { gql } from '@apollo/client';

// User
export const CREATE_USER = gql`
mutation createUser($username: String, $password: String, $email: String) {
  createUser(username: $username, password: $password, email: $email) {
    token
  }
}
`;

// Post
export const CREATE_POST = gql`
mutation CreatePost($text: String) {
  createPost(text: $text) {
    text
    userId {
      username
    }
  }
}
`;

// Comment
export const CREATE_COMMENT = gql`
mutation createComment($text: String) {
  createComment(text: $text) {
    _id
    text
    userId {
      username
    }
  }
}
`;

// Login
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;