const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    managername: {
        type: String
    }

});

var User = mongoose.model('User', UserSchema);
module.exports = {User};