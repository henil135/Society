const express = require('express');
const { createComplaint, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint } = require('../controller/createComplaintController');

const router = express.Router();

router.post('/addcomplaint', createComplaint);
router.get('/', getAllComplaints);
router.get('/:id', getComplaintById);
router.put('/updatecomplaint/:id', updateComplaint);
router.delete('/deletecomplaint/:id', deleteComplaint);

module.exports = router;
