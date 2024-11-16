const mongoose = require('mongoose');

const SocietySchema = new mongoose.Schema({
    Society_name: {
        type: String,
        required: true,
    },
    Society_address: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    ZipCode: {
        type: String,
        required: true,
    },
}, { timestamps: true });  

const Society = mongoose.model('Society', SocietySchema);
module.exports = Society;
