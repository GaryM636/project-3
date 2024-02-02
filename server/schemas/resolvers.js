const { AuthenticationError, signToken } = require('../utils/auth');

const { User, Post } = require('../models');

module.exports = {
    Query: {
        getAllUsers: async () => {
            return await User.find({}); // Working in sandbox
        },
        getUser: async (_, args) => {
            return await User.findById(args.userId).populate('posts'); // Working for finding user by id in sandbox
        },
        getAllPosts: async () => {
            return await Post.find({}).populate('userId'); // Working
        },
        getPost: async (_, args) => {
            return await Post.findById(args.postId).populate('userId'); // Working
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user }; // Working in sandbox
        },
        createPost: async (_, args, context) => { 
            if (context.user) {
                const post = (await Post.create({...args, userId: context.user._id}));
                await User.findByIdAndUpdate(context.user._id, { $push: { posts: post._id} }, { new: true })
                return post.populate("userId")
            }
            throw AuthenticationError
        }, // Working
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        } // Working
    }
};