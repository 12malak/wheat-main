const mongoose = require('mongoose');


const Schema = mongoose.Schema;

//1- Create a new schema 
const aboutUsSchema = new Schema({
     
    title1: {
        type : String,
        required : true
    },
    text1: {
        type : String,
        required : true
    },
    title2: {
        type : String,
        required : true
    },
    text2: {
        type : String,
        required : true
    },
    title3: {
        type : String,
        required : true
    },
    text3: {
        type : String,
        required : true
    },
    },
     {timestamp : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('AboutUs',aboutUsSchema);