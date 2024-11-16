const { updateSecurityGuard, DeleteGuard, GetByIdGuard, GetSecurityGuard, CreateSecurityGuard } = require("../controller/securityGuardController");
const upload = require("../utils/securityImage");
const router = require("express").Router();

//add security Guard
router.post("/addsecurity",upload.fields([{ name: "profileimage", maxCount: 1 },{ name: "adhar_card", maxCount: 1 }, ]), CreateSecurityGuard);
//get Guard
router.get("/", GetSecurityGuard);
//get by id Guard
router.get("/:id", GetByIdGuard);
//delete Guard
router.delete("/deletesecurity/:id", DeleteGuard);
//update Guard
router.put("/updatesecurity/:id",upload.fields([{ name: "profileimage", maxCount: 1 },{ name: "adhar_card", maxCount: 1 },]),updateSecurityGuard );
module.exports = router;
