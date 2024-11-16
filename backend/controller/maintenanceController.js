const Maintenance = require("../models/maintenaceModel")
const { compare } = require("../utils/compare");
const user = require("../models/userModel");

//check password correction in maintenance
exports.CheckMaintenancePassword = async (req, res) => {
    try {
       
        const { Password } = req.body;

        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        
        const isPasswordCorrect = await compare(Password, req.user.Password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password verified successfully"
        });

    } catch (error) {
        console.error("Error during password verification:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


//add maintenance
exports.CreateMaintenance= async (req,res)=>{
    try {
        const {maintenanceAmount,penaltyAmount,dueDate,penaltyDay}=req.body;
        if(!maintenanceAmount || !penaltyAmount || !dueDate || !penaltyDay){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const maintenance= new Maintenance({
            maintenanceAmount,
            penaltyAmount,
            dueDate,
            penaltyDay
        })
        await maintenance.save();
        
        if(!maintenance){
            return res.status(400).json({
                success:false,
                message:"Soemthing went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Maintenance Successfully Added"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}
//get maintenance
exports.GetMaintenance =async (req,res)=>{
    try {
        const  maintenance= await Maintenance.find()
        return res.status(200).json({
          success: true,
          Maintenance: maintenance,
        });
      } catch (error) {
        console.error("Error fetching Maintenance:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Maintenance",
        });
      }
}