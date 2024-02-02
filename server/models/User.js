const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: 'Each Teller must have a proper password',
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            'Invalid password please select a password that is at least contains 1 upper case letter, 1 lower case letter, and is at least 8 characters long. Your password may also have special characters if you like.']
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required for a new client',
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            'This is not a valid email']
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
},
    {
        toJSON: {},
        id: false,
        autoIndex: false
    }
);


const User = model('User', UserSchema);

module.exports = User;