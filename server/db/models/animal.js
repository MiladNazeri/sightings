'use strict';
var mongoose = require('mongoose');

var animalSchema = new mongoose.Schema({
	name: String
});

animalSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var retJson = {
            id: ret._id,
            name: ret.name,
        };
        return retJson;
    }
});

mongoose
mongoose.model('Animal', animalSchema);