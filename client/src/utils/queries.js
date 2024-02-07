import { gql } from '@apollo/client';

// User
export const QUERY_USERS = gql`
query getAllUsers {
  getAllUsers {
    _id
    username
  }
}
`; 

export const QUERY_USER = gql`
query getUser($userId: ID) {
  getUser(userId: $userId) {
    _id
    username
    bio
    birthday
    posts {
      _id
      text
      likes
      comments {
        _id
        text
        likes
        userId {
          username
        }
      }
    }
    followers {
      _id
      username
    }
    following {
      _id
      username
    }
  }
}
`;

// Post
export const QUERY_POSTS = gql`
query GetAllPosts {
  getAllPosts {
    _id
    text
    userId {
      username
    }
    likes
    comments {
      _id
      text
      userId {
        username
      }
      likes
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
    likes
    comments {
      _id
      text
      userId {
        username
      }
      likes
    }
  }
}
`;

// Comment
export const QUERY_COMMENTS = gql`
query getAllComments {
  getAllComments {
    _id
    text
    userId {
      username
    }
    likes
  }
}
`;

export const QUERY_COMMENT =gql`
query GetComment($commentId: ID) {
  getComment(commentId: $commentId) {
    _id
    text
    userId {
      username
    }
    likes
  }
}
`;

export const GET_MESSAGES = gql`
query GetMessages {
  messages {
    _id
    text
    sender
  }
}
`;