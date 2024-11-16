const Request = require('../models/requestTrackingModel');

// Create a new request
exports.createRequest = async (req, res) => {
    try {
        const { Requester_name, Request_name, Request_date,Description, Wing, Unit, Priority, Status, role } = req.body;

        // Check if all required fields are provided
        if (!Requester_name || !Request_name || !Request_date|| !Description || !Wing || !Unit || !Priority || !Status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const request = new Request({
            Requester_name,
            Request_name,
            Request_date,
            Description,
            Wing,
            Unit,
            Priority,
            Status,
            role,
        });

        await request.save();
        res.status(201).json({ message: 'Request created successfully', });
    } catch (error) {
        res.status(400).json({ message: 'Error creating request', error });
    }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json({ message: 'Requests retrieved successfully', requests });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving requests', error });
    }
};

// Get a request by ID
exports.getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request retrieved successfully', request });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving request', error });
    }
};

// Update a request by ID
exports.updateRequest = async (req, res) => {
    try {
        const { Requester_name, Request_name, Request_date, Description, Wing, Unit, Priority, Status, role } = req.body;

        // Check if all required fields are provided for the update
        if (!Requester_name || !Request_name || !Request_date|| !Description || !Wing || !Unit || !Priority || !Status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { Requester_name, Request_name, Request_date,Description, Wing, Unit, Priority, Status, role },
            { new: true, runValidators: true }
        );

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json({ message: 'Request updated successfully', request });
    } catch (error) {
        res.status(400).json({ message: 'Error updating request', error });
    }
};

// Delete a request by ID
exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting request', error });
    }
};
