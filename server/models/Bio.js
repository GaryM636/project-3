const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const BioSchema = new Schema(
    {
        text: {
            type: String,
            maxlength: 60,
        },
        location: {
            type: String
        },
        website: {
            type: String,
            allowNull: true,
            match: [/^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/,
                'Invalid URL type.']
        },
        birthday: {
            type: String,
            
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);



module.exports = BioSchema;