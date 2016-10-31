//third party imports
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

//my imports
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');


var app = express();

//Middleware function to read http req body as JSON
app.use(bodyParser.json());

//Main page
app.get('/', (req, res) => {
    //res.send('Hello express Kunal');
    res.redirect('/users');
});

//Adding a user
app.post('/adduser', function (req, res) {
    //  console.log(req.body);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        managername: req.body.managername
    });
    user.save().then((user) => {
        res.send(user);
    }, (e) => {
        res.status(400).send(e);
    }
    )//then
});//end of add user 

//Deleting a user
app.delete('/users/:id', function (req, res) {
    var id = req.params.id;

    User.findByIdAndRemove(id).then((user)=>{
        res.send({user});
    },
    (e)=> {
        res.status(400).send(e);
    }
    ); //end of then
}); //end of delete user

//Updating user info
app.patch('/users/:id', function (req, res) {
    var id = req.params.id;
    var body = _.pick(req.body, ['phone', 'managername']);

    User.findByIdAndUpdate(id, {$set:body}, {new:true}).then(
        (user)=> {
            res.send({user});
        },
        (e)=>{
            res.status(400).send(e);
        }
    );//end of then
});//end of patch user

//Listing all users
app.get('/users', function (req, res) {
   User.find().then((user)=>{
       res.send(user);
   },(e)=>{
       res.status(400).send(e);
   })//end of then
});//end of list users 


app.listen(3000, () => {
    console.log('Started rest server on port 3000');
});
