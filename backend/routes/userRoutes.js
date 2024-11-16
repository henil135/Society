const express = require("express");
const { Registration, login, logout, resetPassword, editProfile, findUserById, SendOtp, verifyOtp } = require("../controller/userController");
const router = express.Router();

router.post("/Registration", Registration);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);
router.put('/edit/:id', editProfile);
router.get('/:id', findUserById);
router.post('/send-otp', SendOtp);
router.post('/verify-otp', verifyOtp);


module.exports = router;
