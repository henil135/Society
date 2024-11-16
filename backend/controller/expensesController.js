// expensesController.js
const Expenses = require('../models/expensesModel'); // Adjust path as necessary
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")

// Function to handle expense creation
// const createExpense = async (req, res) => {
//     try {
//         // Upload file to Cloudinary (handled by multer middleware)
//         const result = req.file ? req.file.path : null; // URL from Cloudinary

//         if (!result) {
//             return res.status(400).json({ error: 'Upload failed' });
//         }

//         // Create new expense record
//         const expense = new Expenses({
//             Title: req.body.Title,
//             Description: req.body.Description,
//             Date: req.body.Date,
//             Amount: req.body.Amount,
//             Upload_Bill: result 
//         });

//         // Save the expense
//         await expense.save();
//         res.status(201).json({ message: 'Expense created successfully', expense });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.createExpense = async (req, res) => {
    try {

        const {
            Title,
            Description,
            Date,
            Amount,
            role,
        } = req.body;
                        
        
               const uploadAndDeleteLocal = async (fileArray) => {
                if (fileArray && fileArray[0]) {
                    const filePath = fileArray[0].path;
                    try {
                        // Upload to Cloudinary
                        const result = await cloudinary.uploader.upload(filePath);
                        // Delete from local server
                        fs.unlink(filePath, (err) => {
                            if (err) console.error("Error deleting file from server:", err);
                            else console.log("File deleted from server:", filePath);
                        });
                        return result.secure_url;
                    } catch (error) {
                        console.error("Error uploading to Cloudinary:", error);
                        throw error;
                    }
                }
                return '';
            };
    
            // Upload images to Cloudinary and delete local files
            const Upload_Bill = await uploadAndDeleteLocal(req.files?.Upload_Bill);
 
    
        // Create a new owner document
        const newExpenses = new Expenses({
            Title,
            Description,
            Date,
            Amount,
            Upload_Bill,
            role:role || "resident",
            
        });

      
        await newExpenses.save();
        
        // Send success response
       return res.status(201).json({
            success: true,
            message: "Expenses data added successfully",
            
        });
    } catch (error) {
        console.error("Error adding expenses data:", error);
       return res.status(500).json({
            success: false,
            message: "Failed to add Expenses data"
        });
    }
};

exports.GetAllExpenses= async(req,res)=>{
    try {
        const find= await Expenses.find();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.json({
            success:true,
            Owner:find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "Failed to add expenses data"
         });
    }
}

// Get Expense by ID
exports.GetExpenseById = async (req, res) => {
    try {
        const expense = await Expenses.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }
        return res.json({
            success: true,
            expense
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve expense data"
        });
    }
};

// Update Expense
const uploadAndDeleteLocal = async (fileArray) => {
    if (fileArray && fileArray[0]) {
        const filePath = fileArray[0].path;
        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath);
            // Delete from local server
            fs.unlink(filePath, (err) => {
                if (err) console.error("Error deleting file from server:", err);
                else console.log("File deleted from server:", filePath);
            });
            return result.secure_url;
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw error;
        }
    }
    return '';
};

exports.UpdateExpense = async (req, res) => {
    try {
        const { Title, Description, Date, Amount, role } = req.body;

        let uploadUrl;
        if (req.files?.Upload_Bill) {
            uploadUrl = await uploadAndDeleteLocal(req.files?.Upload_Bill); // Upload new file
        }

        const updatedExpense = await Expenses.findByIdAndUpdate(
            req.params.id,
            {
                Title,
                Description,
                Date,
                Amount,
                Upload_Bill: uploadUrl || req.body.Upload_Bill,
                role: role || "resident",
            },
            { new: true } // Return updated document
        );

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.json({
            success: true,
            message: "Expense updated successfully",
            updatedExpense
        });
    } catch (error) {
        console.error("Error updating expense data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update expense data"
        });
    }
};

// Delete Expense
exports.DeleteExpense = async (req, res) => {
    try {
        const expense = await Expenses.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        // Optionally delete the associated image from Cloudinary if needed
        if (expense.Upload_Bill) {
            const publicId = expense.Upload_Bill.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId); // Delete from Cloudinary
        }

        return res.json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting expense data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete expense data"
        });
    }
};