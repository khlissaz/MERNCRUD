const express = require('express');
const user = require('../modeles/user');
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
var { User } = require('../modeles/user');

router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records:' + JSON.stringify(err, undefined, 2))
    });
});

router.post('/', (req, res) => {
    var newUser = new User({
        userName: req.body.userName,
        numeroTelephone: req.body.numeroTelephone,
        email: req.body.email,
        password:req.body.password
    });

    newUser.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating a new user:' + JSON.stringify(err, undefined, 2))
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No user with given id:' + req.params.id)

    var updateUser = {
        userName: req.body.userName,
        numeroTelephone: req.body.numeroTelephone,
        email: req.body.email
    }
    console.log(updateUser);
    
    User.findByIdAndUpdate(req.params.id,req.body,{runValidators: true, useFindAndModify: false,new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("Error while updating user" + JSON.stringify(err, undefined, 2))
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No user with given id:' + req.params.id)
    console.log(req.params.id)
    User.findOneAndDelete(req.params._id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("Error while deleting user" + JSON.stringify(err, undefined, 2))
    });
});


module.exports = router;