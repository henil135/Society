const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    Facility_name: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    Remind_Before: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'resident' 
    },
}, {
    timestamps: true 
});

const Facility = mongoose.model('Facility', FacilitySchema);

module.exports = Facility;
