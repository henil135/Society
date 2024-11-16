const Note = require('../models/noteModel'); // Adjust path as necessary

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const { Title, Description, Date, role } = req.body;

        // Check if all fields are provided
        if (!Title || !Description || !Date ) {
            return res.status(400).json({
                success: false,
                message: "All fields (Title, Description, Date) are required",
            });
        }

        // Create a new note document
        const newNote = new Note({
            Title,
            Description,
            Date,
            role: role || 'resident',
        });

        await newNote.save();

        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            note: newNote,
        });
    } catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create note",
        });
    }
};


// Get all notes or notes by ID
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        if (!notes || notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes found",
            });
        }

        return res.json({
            success: true,
            notes,
        });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
        });
    }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        return res.json({
            success: true,
            note,
        });
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch note",
        });
    }
};

// Edit a note by ID
exports.updateNote = async (req, res) => {
    try {
        const { Title, Description, Date, role } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                Title,
                Description,
                Date,
                role: role || 'resident',
            },
            { new: true } // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        return res.json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote,
        });
    } catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update note",
        });
    }
};
