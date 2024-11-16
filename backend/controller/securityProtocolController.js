const SecurityProtocol = require('../models/securityProtocolModel');

// Create a new Security Protocol
exports.createSecurityProtocol = async (req, res) => {
    const { Title, Description, Date, Time, role } = req.body;

    // Check if all required fields are provided
    if (!Title || !Description || !Date || !Time) {
        return res.status(400).json({
            success: false,
            message: "All fields are required: Title, Description, Date, Time, and role.",
        });
    }

    try {
        const newProtocol = new SecurityProtocol({ Title, Description, Date, Time, role });
        await newProtocol.save();
        res.status(201).json({
            success: true,
            message: "Security protocol created successfully",
            data: newProtocol,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create security protocol",
            error: error.message,
        });
    }
};


// Get all Security Protocols
exports.getAllSecurityProtocols = async (req, res) => {
    try {
        const protocols = await SecurityProtocol.find();
        res.json({
            success: true,
            message: "Fetched all security protocols",
            data: protocols,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch security protocols",
            error: error.message,
        });
    }
};

// Get Security Protocol by ID
exports.getSecurityProtocolById = async (req, res) => {
    try {
        const protocol = await SecurityProtocol.findById(req.params.id);
        if (!protocol) {
            return res.status(404).json({
                success: false,
                message: "Security protocol not found",
            });
        }
        res.json({
            success: true,
            message: "Fetched security protocol",
            data: protocol,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch security protocol",
            error: error.message,
        });
    }
};



// Update Security Protocol by ID
exports.updateSecurityProtocol = async (req, res) => {
    try {
        const updatedProtocol = await SecurityProtocol.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProtocol) {
            return res.status(404).json({
                success: false,
                message: "Security protocol not found",
            });
        }
        res.json({
            success: true,
            message: "Security protocol updated successfully",
            data: updatedProtocol,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update security protocol",
            error: error.message,
        });
    }
};

// Delete Security Protocol by ID
exports.deleteSecurityProtocol = async (req, res) => {
    try {
        const deletedProtocol = await SecurityProtocol.findByIdAndDelete(req.params.id);
        if (!deletedProtocol) {
            return res.status(404).json({
                success: false,
                message: "Security protocol not found",
            });
        }
        res.json({
            success: true,
            message: "Security protocol deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete security protocol",
            error: error.message,
        });
    }
};
