const mongoose=require('mongoose')
var Produit=mongoose.model("produit",
{
    nomProduit:{type:String},
   imei:{type:Number},
   numeroSerie:{type:String},
   modele:{ type: mongoose.Schema.ObjectId,
    ref: 'Modele'},
    user:{ type: mongoose.Schema.ObjectId,
        ref: 'User'}
     

},"produits")
module.exports={Produit }