const Complaint = require('../models/createCamplaintModel');

// Create a new complaint
exports.createComplaint = async (req, res) => {
    try {
        const {
            Complainer_name,
            Complaint_name,
            Description,
            Wing,
            Unit,
            Priority,
            Status,
            role
        } = req.body;

        // Ensure all required fields are provided
        if (!Complainer_name || !Complaint_name || !Description || !Wing || !Unit || !Priority || !Status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const complaint = new Complaint({
            Complainer_name,
            Complaint_name,
            Description,
            Wing,
            Unit,
            Priority,
            Status,
            role
        });

        await complaint.save();
        res.status(201).json({ message: 'Complaint created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating complaint', error });
    }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json({ message: 'Complaints retrieved successfully', complaints });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaints', error });
    }
};

// Get a complaint by ID
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint retrieved successfully', complaint });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaint', error });
    }
};

// Update a complaint by ID
exports.updateComplaint = async (req, res) => {
    try {
        const {
            Complainer_name,
            Complaint_name,
            Description,
            Wing,
            Unit,
            Priority,
            Status,
            role
        } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { Complainer_name, Complaint_name, Description, Wing, Unit, Priority, Status, role },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint updated successfully', complaint });
    } catch (error) {
        res.status(400).json({ message: 'Error updating complaint', error });
    }
};

// Delete a complaint by ID
exports.deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting complaint', error });
    }
};
