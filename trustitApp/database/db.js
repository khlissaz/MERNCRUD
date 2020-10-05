const { json } = require('body-parser');
const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/trustitDB',{useNewUrlParser:true});
err=>{
    if(!err)
        console.log('mongodb connection succeede');  
    else
    console.log('Error wile connceting MongoDB:'+ JSON.stringify(err,undefined,2));  
}

mongoose.set('useCreateIndex', true);