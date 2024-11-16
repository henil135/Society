const express = require('express');
const { createImportantNumber, getAllImportantNumbers, getImportantNumberById, deleteImportantNumber, EditImportantNumber } = require('../controller/importantNumberController');
const router = express.Router();


router.post('/create', createImportantNumber);
router.get('/', getAllImportantNumbers);
router.get('/:id', getImportantNumberById);
router.put('/:id', EditImportantNumber);
router.delete('/:id', deleteImportantNumber);

module.exports = router;
