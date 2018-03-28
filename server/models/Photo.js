'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Photo', schema({
    imageUrl: {
        type: String,
        required: true
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true        
    },
    caption: {
        type: String,
        required: true
    },
    likes: [{
        type: schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
})
)
