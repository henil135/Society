const { Schema, model } = require("mongoose");

const maintenanceschema= new Schema({
    maintenanceAmount:{
        type:Number,
        required:true
    },
    penaltyAmount:{
        type:Number,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    penaltyDay:{
        type:String,
        required:true
    },
    // maintenanceapplyer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
},{timestamps:true})
const Maintenance = model("Maintenance",maintenanceschema)
module.exports=Maintenance