const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { PostLikeSchema } = require('./Likes')

const PostSchema = new Schema({
    text: {
        type: String,
        maxlength: 180,
    },
    picture: {
        type: String,
        allowNull: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    likes: [
        PostLikeSchema
    ],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }]
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

PostSchema.virtual("likeCount", function () {
    return this.likes.length
})

const Post = model('Post', PostSchema);

module.exports = Post;