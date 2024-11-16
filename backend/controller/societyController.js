const Society = require('../models/societyModel');

// Create a new society
exports.CreateSociety = async (req, res) => {
    try {
        const { Society_name, Society_address, Country, State, City, ZipCode } = req.body;
        if (!Society_name || !Society_address || !Country || !State || !City || !ZipCode) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        const societyCreate = new Society({
            Society_name,
            Society_address,
            Country,
            State,
            City,
            ZipCode,
        });
        await societyCreate.save();

        if (!societyCreate) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Society created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get all societies
exports.GetAllSocieties = async (req, res) => {
    try {
        const societies = await Society.find();
        if (!societies) {
            return res.status(404).json({
                success: false,
                message: "No societies found",
            });
        }

        return res.status(200).json({
            success: true,
            data: societies,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
