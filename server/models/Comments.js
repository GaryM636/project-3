const { Schema, model } = require('mongoose');


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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    },
    likes: {
        type: Number
    },
},
{
    toJSON: {
        getters: true
    },
    id: false,
}
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;