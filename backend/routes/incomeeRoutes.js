const { CreateIncome, GetIncome, GetByIdIncome, DeleteIncome, UpdateIncome } = require("../controller/incomexController");

const router=require("express").Router();

//add income
router.post("/addincome",CreateIncome)
//get income
router.get("/",GetIncome)
//get by id income
router.get("/:id",GetByIdIncome)
//delete income
router.delete("/delete/:id",DeleteIncome)
//update income
router.put("/update/:id",UpdateIncome)

module.exports=router