var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var MessageSchema = new Schema({
    messageId: {
        type: String,
        unique: false,
        required: true
    },
    threadId: {
        type: String,
        required: true
    },
    faceBookUserId: {
        type: String,
        required: true
    },
    message: { 
        type: String,
        required: true
    },
    createdTime: {
        type: String,
        required: false
    },
    faceBookgeolocation: { 
        type: String,
        required: false
    },
    respondent: {
        loginId: String,
        threadId: String,
        messageId: { type: String, trim: true },
        message: { type: String, trim: true }
      }

});
 
 
module.exports = mongoose.model('Message', MessageSchema);