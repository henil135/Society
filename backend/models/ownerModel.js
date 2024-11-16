const { Schema, model } = require("mongoose");

const Ownerschema= new Schema({
    profileImage:{
        type:String,
         required:true
    },
    Full_name:{
        type:String,
        required:true
    },
    Phone_number:{
        type:String,
        required:true
    },
    Email_address:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Gender:{
        type:String,
        required:true,
        enum: ['Male', 'Female', 'Other']
    },
    Wing:{
        type:String,
        required:true
    },
    Unit:{
        type:Number,
        required:true,
    },
    Relation:{
        type:String,
        required:true
    },
    Adhar_front:{
        type:String,
        required:true
    },
    Adhar_back:{
        type:String,
        required:true
    },
    Address_proof:{
        type:String,
        required:true
    },
    Rent_Agreement:{
        type:String,
        required:true
    },
    Member_Counting: [{
        Full_name: { type: String, required: true },
        Phone_number: { type: String, required: true },
        Email_address: { type: String, required: true },
        Age: { type: Number, required: true },
        Gender: { type: String, required: true },
        Relation: { type: String, required: true }
    }],
    Vehicle_Counting: [{
        vehicle_type: { type: String, required: true },
        vehicle_name: { type: String, required: true },
        vehicle_number: { type: String, required: true }
    }],
    // cloudinary_id: {
    //     type: String,
    //   },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'resident' 
    },
    password: {  // Add this field to store the hashed password
        type: String,
        required: true
    },
    Resident_status:{
        type:String,
        default:"Owner",
    },
    UnitStatus:{
        type:String,
        default:"Occupied"
    }

},{timestamps:true})


const Owner = model("Owner",Ownerschema);
module.exports=Owner;