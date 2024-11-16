const { Schema, model } = require("mongoose");

const incomeschema= new Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    member:{
        type:Number,
        default:0
    }

},{timestamps:true})
const Income=model("Income",incomeschema)
module.exports=Income;