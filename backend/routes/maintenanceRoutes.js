const { CheckMaintenancePassword, CreateMaintenance, GetMaintenance } = require("../controller/maintenanceController");
const { authenticate } = require("../middleware/authenticate ");
const router=require("express").Router();

//check password correction in maintenance
router.post("/checkpassword",authenticate,CheckMaintenancePassword)

//add maintenance 
router.post("/addmaintenance",CreateMaintenance)
//get maintenance
router.get("/",GetMaintenance)

module.exports=router