import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';

export default function EditProfile() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();

    // Simulating pre-filled profile data (this would normally come from an API)
    const initialData = {
        fname: "Arlene",
        lname: "McCoy",
        email: "arlene@example.com",
        phone: "123-456-7890",
        society: "Shantigram Residency",
        country: "USA",
        state: "Gujarat",
        city: "Baroda"
    };

    // Pre-fill form fields
    useEffect(() => {
        Object.keys(initialData).forEach(key => setValue(key, initialData[key]));
    }, [setValue]);

    // Submit function
    const onSubmit = async data => {
        console.log("Updated Profile Data:", data);
        
        // Simulate data update (replace this with an API call if available)
        // await fetch('/api/updateProfile', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        // });

        // Navigate to profile or another page after update
        navigate('/home'); // Change '/profile' to the desired route
    };

    return (
        <div className="profile-dashboard-bg dashboard-bg" style={{ marginLeft: "270px", width: "1640px" }}>
            <Navbar />
            <div className="d-flex justify-content-center profile-bg">
                <div className="col-lg-8">
                    <h3 className="mb-3 mt-5 profile-title">Edit Profile</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="form-group bg-light p-5 rounded d-flex justify-content-center">
                        <div className="me-5">
                            <img src={profile} alt="Profile" className="img-fluid" />
                            <h5 className="mt-3 text-center">{initialData.fname} {initialData.lname}</h5>
                        </div>

                        <div className="ms-5">
                            <div className="d-flex">
                                <div className="mb-2 w-50 me-2">
                                    <label htmlFor="fname" className="form-label mb-0">First Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                                        {...register('fname', { required: 'First Name is required' })}
                                    />
                                    {errors.fname && <div className="invalid-feedback">{errors.fname.message}</div>}
                                </div>

                                <div className="mb-2 w-50 ms-2">
                                    <label htmlFor="lname" className="form-label mb-0">Last Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                                        {...register('lname', { required: 'Last Name is required' })}
                                    />
                                    {errors.lname && <div className="invalid-feedback">{errors.lname.message}</div>}
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="mb-2 w-50 me-2">
                                    <label htmlFor="phone" className="form-label mb-0">Phone Number <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        {...register('phone', { required: 'Phone Number is required' })}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                </div>

                                <div className="mb-2 w-50 ms-2">
                                    <label htmlFor="email" className="form-label mb-0">Email Address <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        {...register('email', { required: 'Email is required' })}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="mb-2 w-50 me-2">
                                    <label htmlFor="society" className="form-label mb-0">Select Society <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.society ? 'is-invalid' : ''}`}
                                        {...register('society', { required: 'Society is required' })}
                                    />
                                    {errors.society && <div className="invalid-feedback">{errors.society.message}</div>}
                                </div>

                                <div className="mb-2 w-50 ms-2">
                                    <label htmlFor="country" className="form-label mb-0">Country <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                        {...register('country', { required: 'Country is required' })}
                                    />
                                    {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="mb-2 w-50 me-2">
                                    <label htmlFor="state" className="form-label mb-0">State <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                        {...register('state', { required: 'State is required' })}
                                    />
                                    {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                                </div>

                                <div className="mb-2 w-50 ms-2">
                                    <label htmlFor="city" className="form-label mb-0">City <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                        {...register('city', { required: 'City is required' })}
                                    />
                                    {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-3">
                                <button type="submit" className="btn btn-sm profile-btn">
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
