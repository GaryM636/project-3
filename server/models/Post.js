const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PostSchema = new Schema({
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
    }
},
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

const Post = model('Post', PostSchema);

module.exports = Post;