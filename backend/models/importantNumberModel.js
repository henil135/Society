const mongoose = require('mongoose');

const importantNumberSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, 
      },
      work: {
        type: String,
        required: true, 
      },
      role: {
          type: String,
          enum: ['admin', 'resident', 'security'], 
          default: 'resident' 
      },
}, { timestamps: true }); 

module.exports = mongoose.model('ImportantNumber', importantNumberSchema);
