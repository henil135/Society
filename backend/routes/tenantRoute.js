const router=require("express").Router();
const { addTenantData, GetAllTenant } = require("../controller/tenantController");
const upload = require("../utils/ownerImages")


router.post("/addtenant", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'Tenant_image', maxCount: 1 }
]),addTenantData);

router.get("/viewowner",GetAllTenant)
module.exports=router;

