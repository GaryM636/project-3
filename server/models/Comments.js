const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { CommentLikeSchema } = require('./Likes')


const CommentSchema = new Schema({
    text: {
        type: String,
        maxlength: 180,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    likes: [
        CommentLikeSchema
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

CommentSchema.virtual('likesCount', function(){
    return this.likes.length
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;