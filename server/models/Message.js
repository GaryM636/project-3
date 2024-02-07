const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const MessageSchema = new Schema({
    text: {
        type: String,
        maxlength: 180,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverUsername: {
        type: String,
        ref: 'User',
        required: true
    }
},
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

const Message = model('Message', MessageSchema);

module.exports = Message;