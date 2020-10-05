const mongoose=require('mongoose')
var Modele=mongoose.model("modes",
{
    nomModele:{type:String},
    description:{type:String},
    typeModele:{type:String},
  

},"modeles")
module.exports={Modele}