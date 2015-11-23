'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Sighting = mongoose.model('Sighting');

var userSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    sighting: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Sighting'
    },

    group: String,

    salt: {
        type: String
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

userSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var retJson = {
            email: ret.email,
            id: ret._id,
            name: ret.name,
            sighting: ret.sighting,
            group: ret.group
        };
        return retJson;
    }
});
mongoose.model('User', userSchema);