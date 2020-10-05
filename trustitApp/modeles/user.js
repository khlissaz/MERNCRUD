const mongoose=require('mongoose')
var User=mongoose.model("user",
{
    userName:{type:String},
    numeroTelephone:{type:Number},
    email:{type:String},
    password:{type:String},
    dateCreation:{ type: Date, default: Date.now }

},"users")
module.exports={User}