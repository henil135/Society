// ResetPassword.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ResetImage from '../assets/forgotpassword.jpg'; // Use your own image path
import '../style.css';
import Logo from './Logo';

export default function ResetPassword() {
  const navigate = useNavigate(); // Hook to handle redirection
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Simulate password reset logic, replace this with real API call
    setTimeout(() => {
      alert('Password reset successful!');
      navigate('/'); // Redirect to login page
    }, 1000);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left Section - Illustration */}
        <div className=" left-side col-lg-6 d-flex justify-content-center align-items-center bg-light">
            <div>
                <Logo/>
          <img src={ResetImage} alt="Reset Password" className="ResetPassword-image mx-5 mt-5" style={{ maxWidth: '80%' }} />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="right-sec col-lg-6 d-flex justify-content-center align-items-center">
          <div className="ResetPassword-form-container p-4 shadow-lg bg-white rounded" style={{ width: '400px' }}>
            <h2 className="text-center mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* New Password Field */}
              <div className="mb-3 position-relative">
                <label className="form-label fw-bold">New Password<span className="text-danger">*</span></label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                    placeholder="Enter New Password"
                    {...register('newPassword', { required: 'New Password is required' })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-3 position-relative">
                <label className="form-label fw-bold">Confirm Password<span className="text-danger">*</span></label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Enter Confirm Password"
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      validate: (value) =>
                        value === watch('newPassword') || 'Passwords do not match',
                    })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#ee6a42', border: 'none' }}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
