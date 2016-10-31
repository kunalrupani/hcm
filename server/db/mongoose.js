var mongoose = require('mongoose');

//instructs to use promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/hcmapp');

module.exports ={
    mongoose
};