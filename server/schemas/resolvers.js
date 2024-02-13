const { AuthenticationError, signToken } = require('../utils/auth');

const { User, Post, Comment } = require('../models');



module.exports = {
    Query: {
        me: async (_, __, context) => {
            if (context.user) {
                return await User.findById(context.user._id)
                    .populate({ path: "posts", populate: { path: "userId" } })
                    .populate("following")
                    .populate("followers")
                    .populate(
                        {
                            path: 'posts',
                            populate:
                            {
                                path: 'comments',
                                populate:
                                {
                                    path: "userId"
                                }
                            }
                        }
                    );
            }
        },

        getUserMessages: async (_, args, context) => {
            if (context.user) {
                console.log("current user", context.user);
                console.log("getting messages for user", context.user);
                // const messages = await Message.find({})
                const messages = await Message.find({$or:[{senderUsername: context.user.username}, {receiverUsername: context.user.username}] })
                console.log(messages);
                return messages
            }
            throw AuthenticationError
        },

        getAllUsers: async () => {
            return await User.find({})
                .populate("posts")
                .populate("following")
                .populate("followers")
        }, // Done
        getUser: async (_, args) => {
            return await User.findById(args.userId)
                .populate({ path: "posts", populate: { path: "userId" } })
                .populate("following")
                .populate("followers")
                .populate(
                    {
                        path: 'posts',
                        populate:
                        {
                            path: 'comments',
                            populate:
                            {
                                path: "userId"
                            }
                        }
                    }
                );
        }, // Done
        getAllPosts: async () => {
            return await Post.find({})
                .populate('userId')
                .populate(
                    {
                        path: "comments",
                        populate:
                        {
                            path: "userId"
                        }
                    }
                ); // Working
        }, // Done
        getPost: async (_, args) => {
            return await Post.findById(args.postId)
                .populate('userId')
                .populate(
                    {
                        path: "comments",
                        populate: { path: "userId" }
                    }
                ); // Working
        }, // Done
        getAllComments: async () => {
            return await Comment.find({}).populate("userId");
        }, // Done
        getComment: async (_, args) => {
            return await Comment.findById(args.commentId).populate('userId');
        } // Done
    }, // Done
    Mutation: {
        createUser: async (_, args) => {
            await User.init()
            const newUser = new User(args)
            const user = await newUser.save()
            const token = signToken(newUser);

            return { token, user };
        }, // Working in sandbox
        
        sendMessage: async (_, { text, receiverUsername }, context) => {
            if (context.user) {
                console.log("logged in user", context.user);
                const message = await Message.create({ text, receiverUsername, senderUsername: context.user.username })
                return message
            }
            throw AuthenticationError
        },

        // Done
        createPost: async (_, args, context) => {
            if (context.user) {
                const post = (await Post.create({ ...args, userId: context.user._id }));
                await User.findByIdAndUpdate(context.user._id, { $push: { posts: post._id } }, { new: true })
                return post.populate("userId")
            }
            throw AuthenticationError
        }, // Done
        createComment: async (_, args, context) => {
            if (context.user) {
                const comment = await Comment.create({ ...args, userId: context.user._id });
                await Post.findByIdAndUpdate(args.postId, { $push: { comments: comment._id } }, { new: true })
                return comment.populate("postId")
            }
            throw AuthenticationError
        }, // Done
        createBio: async (_, args, context) => {
            if (context.user) {
                const bio = await User.findByIdAndUpdate(context.user._id, { $set: { bio: args } }, { new: true })
                console.log(bio)
                return bio
            }

            throw AuthenticationError
        }, // Done
        likePost: async (_, args, context) => {
            if (context.user) {
                const { _id, username } = context.user
                return await Post.findByIdAndUpdate(args.postId,
                    { $addToSet: { likes: { userId: _id, username } } },
                    { new: true })
            }
            throw AuthenticationError
        }, // Done
        likeComment: async (_, args, context) => {
            if (context.user) {
                const { _id, username } = context.user
                return await Comment.findByIdAndUpdate(args.commentId,
                    { $addToSet: { likes: { userId: _id, username } } },
                    { new: true })
            }
            throw AuthenticationError
        }, // Done
        followUser: async (_, args, context) => {
            if (context.user) {
                await User.findByIdAndUpdate(args.userId, { $push: { followers: context.user._id } }, { new: true })
                return await User.findByIdAndUpdate(context.user._id, { $push: { following: args.userId } }, { new: true })
            }
            throw AuthenticationError
        }, // Done
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
        } // Done
    } // Done
};