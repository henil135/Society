const Income = require("../models/incomeModel");
const moment = require('moment');

// CreateIncome function
exports.CreateIncome = async (req, res) => {
    try {
        const { title, date, dueDate, description, amount, member } = req.body;
        
        if (!title || !date || !dueDate || !description || !amount) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Parse date strings to Date objects
        const parsedDate = moment(date, "DD/MM/YYYY").toDate();
        const parsedDueDate = moment(dueDate, "DD/MM/YYYY").toDate();

        // Validate parsed dates
        if (isNaN(parsedDate) || isNaN(parsedDueDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use DD/MM/YYYY"
            });
        }

        const income = new Income({
            title,
            date: parsedDate,
            dueDate: parsedDueDate,
            description,
            amount,
            member
        });

        await income.save();

        return res.status(200).json({
            success: true,
            message: "Income Successfully Added"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
//get income
exports.GetIncome =async (req,res)=>{
    try {
        const  income= await Income.find()
        return res.status(200).json({
          success: true,
          Income: income,
        });
      } catch (error) {
        console.error("Error fetching Income:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Income",
        });
      }
}
//get by id income
exports.GetByIdIncome =async (req,res)=>{
    try {
        const  income= await Income.findById(req.params.id)
        return res.status(200).json({
          success: true,
          Income: income,
        });
      } catch (error) {
        console.error("Error fetching Income:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Income",
        });
      }
}
//delete income
exports.DeleteIncome =async (req,res)=>{
    try {
        const  income= await Income.findByIdAndDelete(req.params.id)
        return res.status(200).json({
          success: true,
          message:"Income deleted"
        });
      } catch (error) {
        console.error("Error fetching Income:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Income",
        });
      }
}
//update income
exports.UpdateIncome = async (req, res) => {
    try {
        const { title, date, dueDate, description, amount, member } = req.body;
        
        if (!title || !date || !dueDate || !description || !amount) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Parse date strings to Date objects
        const parsedDate = moment(date, "DD/MM/YYYY").toDate();
        const parsedDueDate = moment(dueDate, "DD/MM/YYYY").toDate();

        // Validate parsed dates
        if (isNaN(parsedDate) || isNaN(parsedDueDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use DD/MM/YYYY"
            });
        }

        const income = await Income.findByIdAndUpdate(
            req.params.id,
            { title, date: parsedDate, dueDate: parsedDueDate, description, amount, member },
            { new: true }
        );

        if (!income) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Income Successfully updated"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};