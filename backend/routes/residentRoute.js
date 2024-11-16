const router=require("express").Router();
const { addOwnerData, GetAllOwner, updateOwnerData, GetByIdResident, GetAllResidents, DeleteByIdResident } = require("../controller/ownerController");
const { GetAllTenante, updateTenantData, addTenante } = require("../controller/tenantController");
const upload=require("../utils/ownerImages")
//add owner
router.post("/addowner", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), addOwnerData);
//show owner 
router.get("/viewowner",GetAllOwner)


//update owner
router.put("/owner/:id", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), updateOwnerData);

//add tenant
router.post("/addtenante",upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), addTenante)


//show tenante 
router.get("/viewtenante",GetAllTenante)

//update tenant
router.put("/tenante/:id",upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), updateTenantData)


//======================
//get by id resident
router.get("/owner/:id",GetByIdResident)
// get all resident
router.get("/allresident",GetAllResidents)
//delete resident
router.delete("/:id",DeleteByIdResident)
module.exports=router;