const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    Announcement_Title: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    Announcement_Date: {
        type: Date,
        required: true,
    },
    Announcement_Time: {
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

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;
