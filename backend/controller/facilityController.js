const Facility = require('../models/facilityModel'); // Adjust path as necessary

// Create a new facility
exports.createFacility = async (req, res) => {
    try {
        const { Facility_name, Description, Date, Remind_Before, role } = req.body;

        // Check if all required fields are provided
        if (!Facility_name || !Description || !Date || !Remind_Before) {
            return res.status(400).json({
                success: false,
                message: "All fields (Facility_name, Description, Date, Remind_Before) are required",
            });
        }

        // Create new facility document
        const newFacility = new Facility({
            Facility_name,
            Description,
            Date,
            Remind_Before,
            role: role || 'resident',
        });

        await newFacility.save();

        return res.status(201).json({
            success: true,
            message: "Facility created successfully",
            facility: newFacility,
        });
    } catch (error) {
        console.error("Error creating facility:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create facility",
        });
    }
};

// Get all facilities
exports.getAllFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find();

        if (!facilities.length) {
            return res.status(404).json({
                success: false,
                message: "No facilities found",
            });
        }

        return res.json({
            success: true,
            facilities,
        });
    } catch (error) {
        console.error("Error retrieving facilities:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve facilities",
        });
    }
};

// Get facility by ID
exports.getFacilityById = async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.id);

        if (!facility) {
            return res.status(404).json({
                success: false,
                message: "Facility not found",
            });
        }

        return res.json({
            success: true,
            facility,
        });
    } catch (error) {
        console.error("Error retrieving facility by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve facility",
        });
    }
};

// Update facility by ID
exports.updateFacility = async (req, res) => {
    try {
        const { Facility_name, Description, Date, Remind_Before, role } = req.body;

        const updatedFacility = await Facility.findByIdAndUpdate(
            req.params.id,
            {
                Facility_name,
                Description,
                Date,
                Remind_Before,
                role: role || 'resident',
            },
            { new: true } // Return the updated document
        );

        if (!updatedFacility) {
            return res.status(404).json({
                success: false,
                message: "Facility not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Facility updated successfully",
            facility: updatedFacility,
        });
    } catch (error) {
        console.error("Error updating facility:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update facility",
        });
    }
};
