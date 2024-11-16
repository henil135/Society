const express = require('express');
const { CreateSociety, GetAllSocieties } = require('../controller/societyController');
const router = express.Router();



router.post('/create', CreateSociety);
router.get('/', GetAllSocieties);

module.exports = router;
