const ImportantNumber = require('../models/importantNumberModel');

// create importan numbers

exports.createImportantNumber = async (req, res) => {
    try {
      const { fullName, phoneNumber, work } = req.body;

      if (!fullName || !phoneNumber || !work) {
        return res.status(400).json({
          message: 'All fields are required: fullName, phoneNumber, and work.'
        });
      }

      const newImportantNumber = new ImportantNumber({
        fullName,
        phoneNumber,
        work,
      });

      await newImportantNumber.save();
      res.status(201).json({ message: 'Important number created successfully', data: newImportantNumber });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: 'Phone number already exists. Please use a different phone number.'
        });
      }

      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

// Get all important numbers

exports.getAllImportantNumbers = async (req, res) => {
  try {
    const importantNumbers = await ImportantNumber.find();
    res.status(200).json({ message: 'Important numbers retrieved successfully', data: importantNumbers });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single important number by ID
exports.getImportantNumberById = async (req, res) => {
  try {
    const importantNumberId = req.params.id;
    const importantNumber = await ImportantNumber.findById(importantNumberId);

    if (!importantNumber) {
      return res.status(404).json({ message: 'Important number not found' });
    }

    res.status(200).json({ message: 'Important number found', data: importantNumber });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Edit an important number by ID
exports.EditImportantNumber = async (req, res) => {
    try {
      const importantNumberId = req.params.id;
  
      // Find the current document by ID
      const currentImportantNumber = await ImportantNumber.findById(importantNumberId);
      
      if (!currentImportantNumber) {
        return res.status(404).json({ message: 'Important number not found' });
      }
  
      // Update the important number with provided data
      const updatedImportantNumber = await ImportantNumber.findByIdAndUpdate(
        importantNumberId,
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({ message: 'Important number updated successfully', data: updatedImportantNumber });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

// Delete an important number by ID
exports.deleteImportantNumber = async (req, res) => {
  try {
    const importantNumberId = req.params.id;

    const deletedImportantNumber = await ImportantNumber.findByIdAndDelete(importantNumberId);

    if (!deletedImportantNumber) {
      return res.status(404).json({ message: 'Important number not found' });
    }

    res.status(200).json({ message: 'Important number deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
