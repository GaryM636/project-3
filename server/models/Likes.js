const { Schema, model } = require('mongoose');

const PostLikeSchema = new Schema (
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);


const CommentLikeSchema = new Schema (
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);


module.exports = {PostLikeSchema, CommentLikeSchema};