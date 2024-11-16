const mongoose = require('mongoose');

// Define the schema
const MaintenanceSchema = new mongoose.Schema({
    maintenanceAmount: {
        type: Number,
        required: true,
    },
    penaltyAmount: {
        type: Number,
        required: true,
    },
    maintenanceDueDate: {
        type: Date,
        required: true,
    },
    penaltyAppliedAfterDays: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'resident' 
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt
});

// Create the model
const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);

module.exports = Maintenance;
