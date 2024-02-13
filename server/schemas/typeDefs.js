const gql = String.raw;

module.exports = gql`

    type User {
        _id: ID
        username: String
        password: String
        email: String
        bio: Bio
        profilePicture: String
        posts: [Post]
        followers: [User]
        following: [User]
    }

    type Post {
        _id: ID
        text: String
        picture: String
        userId: User
        createdAt: String
        likes: [PostLikes]
        comments: [Comment]
    }

    type PostLikes {
        _id: ID
        userId: ID!
        username: String!
    }

    type Comment {
        _id: ID
        text: String
        userId: User
        likes: [CommentLikes]
    }

    type CommentLikes {
        _id: ID
        userId: ID!
        username: String!
    }

    type Bio {
        _id: ID
        text: String
        location: String
        website: String
        birthday: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        getAllUsers: [User]
        getUser(userId: ID): User
        getAllPosts: [Post]
        getPost(postId: ID): Post
        getAllComments: [Comment]
        getComment(commentId: ID): Comment
        me: User
        getUserMessages: [Message]

    }

    type Mutation {
        createUser(username: String, password: String, email: String): Auth 
        createPost(text: String, picture: String): Post 
        createComment(text: String, postId: ID): Comment 
        createBio(text: String, website: String, location: String, birthday: String): User
        likePost(postId: ID!): Post
        likeComment(commentId: ID!): Comment
        followUser(userId: ID!): User
        login(email: String!, password: String!): Auth 
        sendMessage(text: String!, receiverUsername: String! ) : Message
    }

    type Message {
        _id: ID
        text: String!
        createdAt: String
        senderUsername: String!
        receiverUsername: String!
    }
`;