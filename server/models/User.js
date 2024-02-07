const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');
const BioSchema = require('./Bio');


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
    bio: {
        type: BioSchema,
        default: () => ({}) 
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    followers:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        toJSON: {},
        id: false,
        autoIndex: false
    }
);

UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  UserSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };




const User = model('User', UserSchema);

module.exports = User;