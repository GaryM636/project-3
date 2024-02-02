const gql = String.raw;

module.exports = gql`

    type User {
        _id: ID
        username: String
        password: String
        email: String
        posts: [Post]
    }

    type Post {
        _id: ID
        text: String
        userId: User
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
    }

    type Mutation {
        createUser(username: String, password: String, email: String): Auth
        createPost(text: String): Post
        login(email: String!, password: String!): Auth
    }
`;