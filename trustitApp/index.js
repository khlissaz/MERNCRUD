require("./database/db");
const express=require('express')
const bodyParser=require('body-parser');
const cors = require("cors")

var user=require('./controllers/userController');
var modele=require('./controllers/modeleController');
var produit=require('./controllers/produitController');


var app=express()
app.use(bodyParser.json())
app.use(cors())
app.listen(4000 ,()=>console.log('Server started at: 4000'))

app.use("/users",user);
app.use("/modeles",modele);
app.use("/produits",produit);