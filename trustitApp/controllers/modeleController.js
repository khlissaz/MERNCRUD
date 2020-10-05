const express = require('express');
const modele = require('../modeles/modele');
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { Modele } = require('../modeles/modele');

router.get('/', (req, res) => {
    Modele.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records:' + JSON.stringify(err, undefined, 2))
    });
});

router.post('/', (req, res) => {
    var newModel = new Modele({
        nomModele: req.body.nomModele,
        typeModele: req.body.typeModele,
        description: req.body.description
        
    });

    newModel.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating a new modele:' + JSON.stringify(err, undefined, 2))
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No modele with given id:' + req.params.id)

    
    Modele.findByIdAndUpdate(req.params.id,req.body,{runValidators: true, useFindAndModify: false,new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("Error while updating model" + JSON.stringify(err, undefined, 2))
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No model with given id:' + req.params.id)
    console.log(req.params.id)
    Modele.findOneAndDelete(req.params._id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("Error while deleting model" + JSON.stringify(err, undefined, 2))
    });
});


module.exports = router;