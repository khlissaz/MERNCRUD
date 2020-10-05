const express = require('express');
//const produit = require('../modeles/user');
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { Produit } = require('../modeles/produit');


router.get('/', (req, res) => {
    Produit.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records:' + JSON.stringify(err, undefined, 2))
    });
});

router.post('/', (req, res) => {
    var newProduct = new Produit({
        nomProduit: req.body.nomProduit,
        imei: req.body.imei,
        numeroSerie: req.body.numeroSerie,
       
    });


    newProduct.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating a new product:' + JSON.stringify(err, undefined, 2))
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No product with given id:' + req.params.id)

    

    
    Produit.findByIdAndUpdate(req.params.id,req.body,{runValidators: true, useFindAndModify: false,new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("Error while updating produit" + JSON.stringify(err, undefined, 2))
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No product with given id:' + req.params.id)
    console.log(req.params.id)
    Produit.findOneAndDelete(req.params._id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("Error while deleting product" + JSON.stringify(err, undefined, 2))
    });
});


module.exports = router;