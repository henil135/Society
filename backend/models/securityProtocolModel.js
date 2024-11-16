const mongoose = require('mongoose');

const securityProtoclSchema = new mongoose.Schema({
    Title: {
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
    Time: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'resident' 
    },
}, {
    timestamps: true 
});

const SecurityProtocol = mongoose.model('SecurityProtocol', securityProtoclSchema);

module.exports = SecurityProtocol;
