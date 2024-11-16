const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../config/auth");
const otpGenerator = require('otp-generator');
const senData = require("../config/mailer"); // Adjust the path accordingly


// Registration page

exports.Registration = async (req, res) => {
  try {
    const { First_Name, Last_Name, Email_Address, Phone_Number, Country, State, City,select_society, Password, Confirm_password } = req.body;

    if (!First_Name || !Last_Name || !Email_Address || !Phone_Number || !Country || !State || !City || !select_society || !Password || !Confirm_password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (Password !== Confirm_password) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email_Address)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ Email_Address });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(Password, salt);

    const newUser = new User({
      First_Name,
      Last_Name,
      Email_Address,
      Phone_Number,
      Country,
      State,
      City,
      select_society,
      Password: hashedPassword,  
      Confirm_password: hashedPassword,  
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    // Return all user fields except Password in the response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        First_Name: newUser.First_Name,
        Last_Name: newUser.Last_Name,
        Email_Address: newUser.Email_Address,
        Phone_Number: newUser.Phone_Number,
        Country: newUser.Country,
        State: newUser.State,
        City: newUser.City,
        select_society: newUser.select_society
      },
    });

  } catch (error) {
    console.log("Error in registration controller:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login Page

exports.login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!/^\d+$/.test(emailOrPhone) && !/\S+@\S+\.\S+/.test(emailOrPhone)) {
      return res.status(400).json({ success: false, message: "Invalid email or phone format" });
    }

    const user = await User.findOne({
      $or: [
        { Email_Address: emailOrPhone },
        { Phone_Number: emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.Password);
   
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      message: "Login successful! Welcome back.",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Logout page 
exports.logout = async (req, res) => {
  try {
    res.clearCookie("Society-Management");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const id = req.params.id;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const finddata = await User.findOne({ Email_Address: email });
    if (!finddata) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Update user's password
    finddata.Password = hashedPassword;
    await finddata.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Error in reset password controller:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Edit profile 

exports.editProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Find user by ID 

exports.findUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found', data: user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.SendOtp = async (req, res) => {
  try {
      const { EmailOrPhone } = req.body;
      const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
      const cdate = new Date();

      let user;
      if (EmailOrPhone.includes('@')) {
          // Find user by Email_Address instead of Email
          user = await User.findOne({ Email_Address: EmailOrPhone });
          if (!user) {
              return res.status(404).json({
                  success: false,
                  message: "Email not registered"
              });
          }

          await User.findOneAndUpdate(
              { Email_Address: EmailOrPhone },
              { otp, otpExpiration: new Date(cdate.getTime()) },
              { upsert: true, new: true, setDefaultsOnInsert: true }
          );

          // Send OTP via email
          senData(user.Email_Address, "Forgot your password", otp);

          return res.status(200).json({
              success: true,
              message: "OTP sent successfully to email"
          });

      } else {
          // For phone number handling (to be added later)
      }

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: "Internal server error"
      });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
      const { EmailOrPhone, otp } = req.body;

      let user;

      if (EmailOrPhone.includes('@')) {
          user = await User.findOne({ Email_Address: EmailOrPhone });
      } else {
          user = await User.findOne({ Phone: EmailOrPhone });
      }
      

      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found"
          });
      }

      // Check if OTP matches
      if (user.otp !== otp) {
          return res.status(400).json({
              success: false,
              message: "Invalid OTP"
          });
      }

      // const currentDate = new Date();
      // if (currentDate > user.otpExpiration) {
      //     return res.status(400).json({
      //         success: false,
      //         message: "OTP has expired"
      //     });
      // }

      // Clear OTP after successful verification
      await User.findByIdAndUpdate(user._id, { otp: null, otpExpiration: null });

      return res.status(200).json({
          success: true,
          message: "OTP verified successfully"
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: "Internal server error"
      });
  }
};
