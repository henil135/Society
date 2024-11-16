const router=require("express").Router();

const { createExpense, GetAllExpenses, GetExpenseById, UpdateExpense, DeleteExpense,  } = require("../controller/expensesController");
const upload=require("../utils/expensesImage")


router.post("/addexpenses", upload.fields([{ name: 'Upload_Bill', maxCount: 1 },]),createExpense);
router.get("/viewexpenses",GetAllExpenses)
router.get('/:id', GetExpenseById);
router.put('/updateexpenses/:id',  upload.fields([{ name: 'Upload_Bill', maxCount: 1 },]), UpdateExpense);
router.delete('/:id', DeleteExpense);

module.exports=router;