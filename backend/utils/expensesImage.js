const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Destination for storing files
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // Unique filename
    }
});

// Initialize Multer with limits
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        // Check for allowed file types (PDF and JPG only)
        const filetypes = /pdf|jpg/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg';

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Error: Only PDF and JPG files are allowed!')); // Handle error for wrong file type
        }
    }
});

// Export the upload middleware for use in routes
module.exports = upload;
