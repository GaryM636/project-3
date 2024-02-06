import { gql } from '@apollo/client';

// User
export const CREATE_USER = gql`
mutation CreateUser($username: String, $password: String, $email: String, $bio: String, $birthday: String) {
  createUser(username: $username, password: $password, email: $email, bio: $bio, birthday: $birthday) {
    token
  }
}
`;

// Post
export const CREATE_POST = gql`
mutation createPost($text: String) {
  createPost(text: $text) {
    _id
    text
    userId {
      username
    }
  }
}
`;

// Comment
export const CREATE_COMMENT = gql`
mutation createComment($text: String, $postId: ID) {
  createComment(text: $text, postId: $postId) {
    text
  }
}
`;

// Login
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;