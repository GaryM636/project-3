const { AuthenticationError, signToken } = require('../utils/auth');

const { User, Post, Comment } = require('../models');



module.exports = {
    Query: {
        getAllUsers: async () => {
            return await User.find({}).populate("posts");
        }, // Working in sandbox
        getUser: async (_, args) => {
            return await User.findById(args.userId).populate('posts');
        }, // Working in sandbox
        getAllPosts: async () => {
            return await Post.find({}).populate('userId').populate("comments"); // Working
        },
        getPost: async (_, args) => {
            return await Post.findById(args.postId).populate('userId').populate({ path: "comments", populate: { path: "userId" } } ); // Working
        },
        getAllComments: async () => {
            return await Comment.find({}).populate("userId");
        },
        getComment: async (_, args) => {
            return await Comment.findById(args.commentId).populate('userId');
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        }, // Working in sandbox
        createPost: async (_, args, context) => {
            if (context.user) {
                const post = (await Post.create({ ...args, userId: context.user._id }));
                await User.findByIdAndUpdate(context.user._id, { $push: { posts: post._id } }, { new: true })
                return post.populate("userId")
            }
            throw AuthenticationError
        }, // Working
        createComment: async (_, args, context) => {
            if (context.user) {
                const comment = await Comment.create({ ...args, userId: context.user._id });
                await Post.findByIdAndUpdate(args.postId, { $push: { comments: comment._id } }, { new: true })
                return comment.populate("postId")
            }
            throw AuthenticationError
        },
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