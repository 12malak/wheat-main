const mongoose = require('mongoose');



const Schema = mongoose.Schema;


//1- Create a new schema 
const userSchema = new Schema({
     
    firstName: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
   
    role:{
        type : Number,
        required : true
    },
    phone:{
        type : Number,
        required : false

    },
    providersId:{
        type : Array,
        required : false
    },
    message:{
        type : Array,
        required : false
    }
    },
   
    
     {timestamp : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('User',userSchema);