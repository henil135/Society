const express = require('express');
const { createFacility, getAllFacilities, getFacilityById, updateFacility } = require('../controller/facilityController');
const router = express.Router();

router.post('/addfacility', createFacility);
router.get('/', getAllFacilities);
router.get('/:id', getFacilityById);
router.put('/updatefacility/:id', updateFacility);

module.exports = router;
