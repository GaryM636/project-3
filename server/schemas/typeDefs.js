const gql = String.raw;

module.exports = gql`

    type User {
        _id: ID
        username: String
        password: String
        email: String
        bio: String
        birthday: String
        posts: [Post]
        followers: [User]
        following: [User]
    }

    type Post {
        _id: ID
        text: String
        userId: User
        likes: Int
        comments: [Comment]
    }

    type Comment {
        _id: ID
        text: String
        userId: User
        likes: Int
    }

    type Message {
        _id: ID
        text: String!
        createdAt : String
        senderId: ID!
        receiverUsername: String!
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
    }

    type Mutation {
        createUser(username: String, password: String, email: String, bio: String, birthday: String): Auth # Works
        createPost(text: String): Post # Works
        createComment(text: String, postId: ID): Comment # Needs to be worked on for userId and postId
        followUser(userId: ID!): User
        login(email: String!, password: String!): Auth # Works
        sendMessage(text: String!, receiverUsername: String! ) : Message 
    }
`;