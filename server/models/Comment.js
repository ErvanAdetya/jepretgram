'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Comment', schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true        
    },
    photo: {
        type: schema.Types.ObjectId,
        ref: 'Photo',
        required: true        
    }
}, {
    timestamps: true
}))
