const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: true,
  },
  Email_Address: {
    type: String,
    required: true,
    unique: true,  
  },
  Phone_Number: {
    type: String,
    required: true,
  },
  Country:{
    type: String,
    required: true,
  },
  State:{
    type: String,
    required: true,
  },
  City:{
    type: String,
    required: true,
  },
  select_society:{
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Society' 
  },
  Password:{
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'resident', 'security'], 
    default: 'admin' 
  },
  otp:{
    type:String,
  },
  otpExpiration:{
    type:Date,
    default:Date.now,
    get:(otpExpiration)=>otpExpiration.getTime(),
    set:(otpExpiration)=>new Date(otpExpiration)
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
