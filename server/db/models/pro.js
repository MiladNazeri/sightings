'use strict';
var mongoose = require('mongoose');
var Whale = mongoose.model('Whale');

var userSchema = new mongoose.Schema({

    whale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Whale',
        required: true
    },
    location: {
        type: [Number],
        required: true
    },
    time: {
        type: Date,
        required: true
    },

    address : {
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    title: String,

    type: String,

    story: String,

    reply: String,

    notAppropriate: {
        type: Boolean,
        required: true,
        default: false
    },

    photo: {
        type: String,
        required: true
    }

});

mongoose.model('User', userSchema);