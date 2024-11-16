const Announcement = require('../models/annoucementModel');

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { Announcement_Title, Description, Announcement_Date, Announcement_Time, role } = req.body;

        if (!Announcement_Title || !Description || !Announcement_Date || !Announcement_Time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const announcement = new Announcement({
            Announcement_Title,
            Description,
            Announcement_Date,
            Announcement_Time,
            role,
        });

        await announcement.save();
        res.status(201).json({ message: 'Announcement created successfully', });
    } catch (error) {
        res.status(400).json({ message: 'Error creating announcement', error });
    }
};


// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving announcements', error });
    }
};

// Get an announcement by ID
exports.getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json({ message: 'Announcement retrieved successfully', announcement });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving announcement', error });
    }
};

// Update an announcement by ID
exports.updateAnnouncement = async (req, res) => {
    try {
        const { Announcement_Title, Description, Announcement_Date, Announcement_Time, role } = req.body;

        if (!Announcement_Title || !Description || !Announcement_Date || !Announcement_Time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            { Announcement_Title, Description, Announcement_Date, Announcement_Time, role },
            { new: true, runValidators: true }
        );

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json({ message: 'Announcement updated successfully', announcement });
    } catch (error) {
        res.status(400).json({ message: 'Error updating announcement', error });
    }
};

// Delete an announcement by ID
exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting announcement', error });
    }
};

