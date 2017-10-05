var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    loginId: {
        type: String,
        unique: true,
        required: true
    },
    role: { 
        type: String,
        required: true
    },
    phoneMobile: {
        type: String,
        unique: true,
        required: false
    },
    supervisor: { 
        type: String,
        required: false
    },
    createDate: { 
        type: String,
        required: true
    },
    updateDate: { 
        type: String,
        required: false
    },
    updateBy: { 
        type: String,
        required: true
    }

});
 
/*
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
*/
 
module.exports = mongoose.model('User', UserSchema);