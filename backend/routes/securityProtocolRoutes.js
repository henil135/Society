const express = require('express');
const { createSecurityProtocol, getAllSecurityProtocols, getSecurityProtocolById, updateSecurityProtocol, deleteSecurityProtocol } = require('../controller/securityProtocolController');
const router = express.Router();

router.post('/addsecurityprotocol', createSecurityProtocol);
router.get('/', getAllSecurityProtocols);
router.get('/:id', getSecurityProtocolById);
router.put('/update/:id', updateSecurityProtocol);
router.delete('/delete/:id', deleteSecurityProtocol);

module.exports = router;
