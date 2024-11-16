const express = require('express');
const { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest } = require('../controller/requestTrackingController');
const router = express.Router();

router.post('/addrequest', createRequest);
router.get('/', getAllRequests);
router.get('/:id', getRequestById);
router.put('/updaterequest/:id', updateRequest);
router.delete('/deleterequest/:id', deleteRequest);

module.exports = router;
