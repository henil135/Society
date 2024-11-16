const Owner = require('../models/ownerModel'); 
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")
const crypto= require("crypto");
const senData = require('../config/mailer');
const { hash } = require('../utils/hashpassword');
const Tenante = require('../models/tenantModel');

exports.addOwnerData = async (req, res) => {
    try {

        function generatePassword(length= 6){
              const password= crypto.randomInt(0, Math.pow(10,length)).toString();
              return password.padStart(length,"0")
        }
        const {
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
              const existingWing = await Owner.findOne({ Wing, Unit });
        if (existingWing) {
            return res.status(400).json({
                success: false,
                message: "An  Wing and Unit already exists.",
            });
        }
    
        // Create a new owner document
        const newOwner = new Owner({
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
            // cloudinary_id: result.public_id,
            role:role || "resident",
            Resident_status:Resident_status || "Owner",
            UnitStatus:UnitStatus || "Occupied",
            password: hashpassword
            
        });  

      
        await newOwner.save();
        

        await senData(
            newOwner.Email_address,
            "Registration Successful - Login Details",
            `Dear ${newOwner.Full_name},\n\nYou have successfully registered as a resident. Your login details are as follows:\n\nUsername: ${newOwner.Email_address}\nPassword: <b> ${password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
        );
   
       

       
       
        // Handle Member Counting
        if (Member_Counting) {
            const members = JSON.parse(Member_Counting);
            await Owner.updateOne(
                { _id: newOwner._id },
                { $push: { Member_Counting: { $each: members } } }
            );
        }

        // Handle Vehicle Counting
        if (Vehicle_Counting) {
            const vehicles = JSON.parse(Vehicle_Counting);
            await Owner.updateOne(
                { _id: newOwner._id },
                { $push: { Vehicle_Counting: { $each: vehicles } } }
            );
        }

        // Send success response
       return res.status(201).json({
            success: true,
            message: "Owner data added successfully",
            
        });
    } catch (error) {
        console.error("Error adding owner data:", error);
       return res.status(500).json({
            success: false,
            message: "Failed to add owner data"
        });
    }
};
exports.GetAllOwner = async (req, res) => {
    try {
        // Fetch all owners sorted by Wing and Unit
        const owners = await Owner.find().sort({ Wing: 1, Unit: 1 });

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
        console.error("Error fetching owner counts:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve owner data"
        });
    }
};
// //get by  id owner resident
// exports.GetByIdOwnerResident = async (req, res) => {
//     try {
//         // Fetch the owner by ID
//         const owner = await Owner.findById(req.params.id);
        
//         // Check if the owner was found
//         if (!owner) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No data found, ID is incorrect"
//             });
//         }
        
//         // Structure the data to return
//         const ownerData = {
//             profileImage: owner.profileImage,
//             Full_name: owner.Full_name,
//             Email_address: owner.Email_address,
//             Unit: owner.Unit,
//             Wing: owner.Wing,
//             Age: owner.Age,
//             Gender: owner.Gender,
//             Adhar_front: owner.Adhar_front,
//             Address_proof: owner.Address_proof,
//             Phone_number: owner.Phone_number,
//             Member_Counting_Total: owner.Member_Counting,
//             Vehicle_Counting_Total: owner.Vehicle_Counting
//         };

//         // Return the response with the owner's data
//         return res.status(200).json({
//             success: true,
//             Owner: ownerData
//         });
//     } catch (error) {
//         console.error("Error fetching owner data:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error fetching owner data"
//         });
//     }
// };
//find by id Tenate

exports.GetByIdResident = async (req, res) => {
    try {
        
        let resident = await Tenante.findById(req.params.id);

        
        if (!resident) {
            resident = await Owner.findById(req.params.id);
        }

       
        if (!resident) {
            return res.status(400).json({
                success: false,
                message: "No data found, ID is incorrect"
            });
        }

        
        const residentData = {
            profileImage: resident.profileImage,
            Full_name: resident.Full_name,
            Email_address: resident.Email_address,
            Unit: resident.Unit,
            Wing: resident.Wing,
            Age: resident.Age,
            Gender: resident.Gender,
            Adhar_front: resident.Adhar_front,
            Address_proof: resident.Address_proof,
            Owner_Full_name: resident.Owner_Full_name,
            Owner_Phone: resident.Owner_Phone,
            Owner_Address: resident.Owner_Address,
            Member_Counting_Total: resident.Member_Counting ? resident.Member_Counting.length : 0,
            Member_Counting: resident.Member_Counting || [],
            Vehicle_Counting_Total: resident.Vehicle_Counting ? resident.Vehicle_Counting.length : 0,
            Vehicle_Counting: resident.Vehicle_Counting || [],
            
            ...(resident.Owner_Full_name ? {
                Owner_Full_name: resident.Owner_Full_name,
                Owner_Phone: resident.Owner_Phone,
                Owner_Address: resident.Owner_Address,
            } : {})
        };

        // Return the response with the resident's data
        return res.status(200).json({
            success: true,
            Resident: residentData
        });
    } catch (error) {
        console.error("Error fetching resident data:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching resident data"
        });
    }
};
exports.DeleteByIdResident = async (req, res) => {
    try {
        
        let resident = await Tenante.findByIdAndDelete(req.params.id);

        
        if (!resident) {
            resident = await Owner.findByIdAndDelete(req.params.id);
        }

       
        if (!resident) {
            return res.status(400).json({
                success: false,
                message: "No data found, ID is incorrect or already deleted"
            });
        }

        
        return res.status(200).json({
            success: true,
            message: "Resident data deleted successfully",
           
        });
    } catch (error) {
        console.error("Error deleting resident data:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting resident data"
        });
    }
};

exports.GetAllResidents = async (req, res) => {
    try {
       
        const tenants = await Tenante.find().sort({ Wing: 1, Unit: 1 });
        const owners = await Owner.find().sort({ Wing: 1, Unit: 1 });

        
        if ((!tenants || tenants.length === 0) && (!owners || owners.length === 0)) {
            return res.status(400).json({
                success: false,
                message: "No data found "
            });
        }

        // Map each to the desired format
        const tenantData = tenants.map(tenant => ({
            id:tenant._id,
            profileImage: tenant.profileImage,
            Full_name: tenant.Full_name,
            Unit: tenant.Unit,
            Wing: tenant.Wing,
            UnitStatus: tenant.UnitStatus,
            Resident_status: tenant.Resident_status,
            Phone_number: tenant.Phone_number,
            Member_Counting_Total: tenant.Member_Counting ? tenant.Member_Counting.length : 0,
            Vehicle_Counting_Total: tenant.Vehicle_Counting ? tenant.Vehicle_Counting.length : 0,
            
        }));

        const ownerData = owners.map(owner => ({
            id:owner._id,
            profileImage: owner.profileImage,
            Full_name: owner.Full_name,
            Unit: owner.Unit,
            Wing: owner.Wing,
            UnitStatus: owner.UnitStatus,
            Resident_status: owner.Resident_status,
            Phone_number: owner.Phone_number,
            Member_Counting_Total: owner.Member_Counting ? owner.Member_Counting.length : 0,
            Vehicle_Counting_Total: owner.Vehicle_Counting ? owner.Vehicle_Counting.length : 0,
            
        }));

        
        const allResidents = [...tenantData, ...ownerData].sort((a, b) => {
            if (a.Wing === b.Wing) {
                return a.Unit - b.Unit;
            }
            return a.Wing.localeCompare(b.Wing);
        });

        // Respond with the combined data
        return res.json({
            success: true,
            Residents: allResidents
        });
    } catch (error) {
        console.error("Error fetching residents:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve residents data"
        });
    }
};
exports.updateOwnerData = async (req, res) => {
    try {
      const {
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
        UnitStatus,
      } = req.body;
  
      const { id } = req.params; 
      
  
      
      
  
      // Function to upload files to Cloudinary and delete from local
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
  
      // Upload new profile and document images if provided
      const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
      const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
      const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
      const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
      const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);
  
    
      if (!Full_name || !Phone_number || !Email_address || !Age || !Gender || !Wing || !Unit || !Relation || !profileImage || !Adhar_front || !Adhar_back || !Address_proof || !Rent_Agreement) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      
      const existingOwner = await Owner.findOne({ Wing, Unit });
      if (existingOwner && existingOwner._id.toString() !== id) {
        return res.status(400).json({
          success: false,
          message: "Wing and Unit already exists for another owner.",
        });
      }
  
      // Find the owner to update
      const owner = await Owner.findById(id);
      if (!owner) {
        return res.status(404).json({
          success: false,
          message: "Owner not found",
        });
      }
  
      // Update fields with new values if provided
      if (Full_name) owner.Full_name = Full_name;
      if (Phone_number) owner.Phone_number = Phone_number;
      if (Email_address) owner.Email_address = Email_address;
      if (Age) owner.Age = Age;
      if (Gender) owner.Gender = Gender;
      if (Wing) owner.Wing = Wing;
      if (Unit) owner.Unit = Unit;
      if (Relation) owner.Relation = Relation;
      if (Resident_status) owner.Resident_status = Resident_status;
      if (UnitStatus) owner.UnitStatus = UnitStatus;
      if (profileImage) owner.profileImage = profileImage;
      if (Adhar_front) owner.Adhar_front = Adhar_front;
      if (Adhar_back) owner.Adhar_back = Adhar_back;
      if (Address_proof) owner.Address_proof = Address_proof;
      if (Rent_Agreement) owner.Rent_Agreement = Rent_Agreement;
    //   if (hashpassword) owner.password = hashpassword; // Update password only if provided
  
     
      if (Member_Counting) {
        const members = JSON.parse(Member_Counting);
        owner.Member_Counting = members; 
      }
  
      // Handle Vehicle Counting
      if (Vehicle_Counting) {
        const vehicles = JSON.parse(Vehicle_Counting);
        owner.Vehicle_Counting = vehicles;
      }
  
      // Save the updated owner document
      await owner.save();
  
      return res.status(200).json({
        success: true,
        message: "Owner data updated successfully",
      });
  
    } catch (error) {
      console.error("Error updating owner data:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update owner data",
      });
    }
  };
  

//find by id owner