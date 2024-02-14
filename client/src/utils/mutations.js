import { gql } from '@apollo/client';

// User
export const CREATE_USER = gql`
mutation CreateUser($username: String, $password: String, $email: String) {
  createUser(username: $username, password: $password, email: $email) {
    token
  }
}
`; // Good

// Bio
export const CREATE_BIO = gql`
mutation createBio($text: String, $website: String, $location: String, $birthday: String) {
  createBio(text: $text, website: $website, location: $location, birthday: $birthday) {
    bio {
      _id
      text
      location
      website
      birthday
    }
  }
}
`; // Good

// Post
export const CREATE_POST = gql`
mutation createPost($text: String, $picture: String) {
  createPost(text: $text, picture: $picture) {
    _id
    text
    picture
    userId {
      username
    }
  }
}
`; // Good

// Like Post
export const LIKE_POST = gql`
mutation LikePost($postId: ID!) {
  likePost(postId: $postId) {
    _id
  }
}
`; // Good

// Comment
export const CREATE_COMMENT = gql`
mutation createComment($text: String, $postId: ID) {
  createComment(text: $text, postId: $postId) {
    text
  }
}
`; // Good

// Like Comment
export const LIKE_COMMENT = gql`
mutation likeComment($commentId: ID!) {
  likeComment(commentId: $commentId) {
    _id
  }
}
`;

// Following 
export const FOLLOW_USER = gql`
mutation followUser($userId: ID!) {
  followUser(userId: $userId) {
    username
  }
}
`; // Good

// Login
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`; // Good

// Delete Post
export const DELETE_POST = gql`
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}
`; // Added