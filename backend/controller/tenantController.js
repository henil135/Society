const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")
const crypto= require("crypto");
const senData = require('../config/mailer');
const { hash } = require('../utils/hashpassword');
const Tenante = require('../models/tenantModel');

exports.addTenante = async (req, res) => {
    try {

        function generatePassword(length= 6){
              const password= crypto.randomInt(0, Math.pow(10,length)).toString();
              return password.padStart(length,"0")
        }
        const {
            Owner_Full_name,
            Owner_Phone,
            Owner_Address,
            Full_name,
            Phone_number,
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Member_Counting,
            Vehicle_Counting,
            role,
            Resident_status,
            UnitStatus
            
        } = req.body;
               const password=  generatePassword();
               console.log(password);

               const hashpassword= await hash(password)
               
        
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
            const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
            const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
            const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
            const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
            const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

            if (
                !Owner_Full_name ||
                !Owner_Phone ||
                !Owner_Address ||
                !Full_name ||
                !Phone_number ||
                !Email_address ||
                !Age ||
                !Gender ||
                !Wing ||
                !Unit ||
                !Relation ||
                !Member_Counting ||
                !Vehicle_Counting ||
                !profileImage ||
                !Adhar_front ||
                !Adhar_back ||
                !Address_proof ||
                !Rent_Agreement 
              ) {
                return res.status(400).json({
                  success: false,
                  message: "All fields are required",
                });
              }
              const existingWing = await Tenante.findOne({ Wing, Unit });
              if (existingWing) {
                  return res.status(400).json({
                      success: false,
                      message: "An  Wing and Unit already exists.",
                  });
              }
        // Create a new owner document
        const newOwner = new Tenante({
            Owner_Full_name,
            Owner_Phone,
            Owner_Address,
            profileImage,
            Full_name,
            Phone_number,  
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Adhar_front,
            Adhar_back,
            Address_proof,
            Rent_Agreement,
            role:role || "resident",
            Resident_status:Resident_status || "Tenante",
            UnitStatus:UnitStatus || "Occupied",
            password: hashpassword
            
        });

      
        await newOwner.save();
        

        await senData(
            newOwner.Email_address,
            "Tenante Registration Successful - Login Details",
            `Dear ${newOwner.Full_name},\n\nYou have successfully registered as a Tenante. Your login details are as follows:\n\nUsername: ${newOwner.Email_address}\nPassword: <b> ${password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
        );
   
       

       
       
        // Handle Member Counting
        if (Member_Counting) {
            const members = JSON.parse(Member_Counting);
            await Tenante.updateOne(
                { _id: newOwner._id },
                { $push: { Member_Counting: { $each: members } } }
            );
        }

        // Handle Vehicle Counting
        if (Vehicle_Counting) {
            const vehicles = JSON.parse(Vehicle_Counting);
            await Tenante.updateOne(
                { _id: newOwner._id },
                { $push: { Vehicle_Counting: { $each: vehicles } } }
            );
        }

        // Send success response
       return res.status(201).json({
            success: true,
            message: "Tenante data added successfully",
            
        });
    } catch (error) {
        console.error("Error adding owner data:", error);
       return res.status(500).json({
            success: false,
            message: "Failed to add owner data"
        });
    }
};
exports.GetAllTenante= async(req,res)=>{
    try {
        // Fetch all owners sorted by Wing and Unit
        const owners = await Tenante.find().sort({ Wing: 1, Unit: 1 });

        if (!owners || owners.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            });
        }

        
        const ownerCounts = owners.map(owner => ({
            profileImage:owner.profileImage,
            Full_name: owner.Full_name,
            Unit: owner.Unit,
            Wing: owner.Wing,
            Resident_status: owner.Resident_status,
            Phone_number: owner.Phone_number,
            Member_Counting_Total: owner.Member_Counting ? owner.Member_Counting.length : 0,
            Vehicle_Counting_Total: owner.Vehicle_Counting ? owner.Vehicle_Counting.length : 0
        }));

        // Respond with only the counts
        return res.json({
            success: true,
            Owner: ownerCounts
        });
    } catch (error) {
        console.error("Error fetching owner Tenante:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve Tenante data"
        });
    }
}
exports.updateTenantData = async (req, res) => {
    try {
      const {
        Owner_Full_name,
        Owner_Phone,
        Owner_Address,
        Full_name,
        Phone_number,
        Email_address,
        Age,
        Gender,
        Wing,
        Unit,
        Relation,
        Member_Counting,
        Vehicle_Counting,
        Resident_status,
        UnitStatus
      } = req.body;
  
      const { id } = req.params; 
  
      
      const uploadAndDeleteLocal = async (fileArray) => {
        if (fileArray && fileArray[0]) {
          const filePath = fileArray[0].path;
          try {
            const result = await cloudinary.uploader.upload(filePath);
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
  
      // Upload images to Cloudinary and delete local files (only if new files are uploaded)
      const profileImage = req.files?.profileImage ? await uploadAndDeleteLocal(req.files?.profileImage) : null;
      const Adhar_front = req.files?.Adhar_front ? await uploadAndDeleteLocal(req.files?.Adhar_front) : null;
      const Adhar_back = req.files?.Adhar_back ? await uploadAndDeleteLocal(req.files?.Adhar_back) : null;
      const Address_proof = req.files?.Address_proof ? await uploadAndDeleteLocal(req.files?.Address_proof) : null;
      const Rent_Agreement = req.files?.Rent_Agreement ? await uploadAndDeleteLocal(req.files?.Rent_Agreement) : null;
  
     
      if (
        !Owner_Full_name ||
        !Owner_Phone ||
        !Owner_Address ||
        !Full_name ||
        !Phone_number ||
        !Email_address ||
        !Age ||
        !Gender ||
        !Wing ||
        !Unit ||
        !Relation ||
        !profileImage ||
        !Adhar_front ||
        !Adhar_back ||
        !Address_proof ||
        !Rent_Agreement
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      
      const existingTenant = await Tenante.findOne({ Wing, Unit });
      if (existingTenant && existingTenant._id.toString() !== id) {
        return res.status(400).json({
          success: false,
          message: "An tenant already exists with this Wing and Unit.",
        });
      }
  
     
      const tenant = await Tenante.findById(id);
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: "Tenant not found",
        });
      }
  
     
      if (Owner_Full_name) tenant.Owner_Full_name = Owner_Full_name;
      if (Owner_Phone) tenant.Owner_Phone = Owner_Phone;
      if (Owner_Address) tenant.Owner_Address = Owner_Address;
      if (Full_name) tenant.Full_name = Full_name;
      if (Phone_number) tenant.Phone_number = Phone_number;
      if (Email_address) tenant.Email_address = Email_address;
      if (Age) tenant.Age = Age;
      if (Gender) tenant.Gender = Gender;
      if (Wing) tenant.Wing = Wing;
      if (Unit) tenant.Unit = Unit;
      if (Relation) tenant.Relation = Relation;
      if (Resident_status) tenant.Resident_status = Resident_status;
      if (UnitStatus) tenant.UnitStatus = UnitStatus;
  
      
      if (profileImage) tenant.profileImage = profileImage;
      if (Adhar_front) tenant.Adhar_front = Adhar_front;
      if (Adhar_back) tenant.Adhar_back = Adhar_back;
      if (Address_proof) tenant.Address_proof = Address_proof;
      if (Rent_Agreement) tenant.Rent_Agreement = Rent_Agreement;
  
      
      if (Member_Counting) {
        const members = JSON.parse(Member_Counting);
        tenant.Member_Counting = members; 
      }
  
     
      if (Vehicle_Counting) {
        const vehicles = JSON.parse(Vehicle_Counting);
        tenant.Vehicle_Counting = vehicles; 
      }
  
      
      await tenant.save();
  
      return res.status(200).json({
        success: true,
        message: "Tenant data updated successfully",
      });
  
    } catch (error) {
      console.error("Error updating tenant data:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update tenant data",
      });
    }
  };
  


