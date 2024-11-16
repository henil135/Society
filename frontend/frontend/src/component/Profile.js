import React from 'react'
import Navbar from './Navbar'
import { useForm } from 'react-hook-form';
import profile from '../assets/profile.png';
import { MdEditSquare } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Profile() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // Simulating pre-filled profile data (this would normally come from an API)
    const initialData = {
        fname: "Arlene",
        lname: "McCoy",
        email: "aelenemccoy@example.com",
        phone: "123-456-7890",
        society: " Shantigram residency ",
        country: "McCoy",
        state: "Gujarat",
        city: "Baroda"
    };


    // Submit function
    const onSubmit = data => {
        console.log(data);
        // Here, you would handle form submission to your server or API
    };

    return (
        <div className="profile-dashboard-bg dashboard-bg" style={{marginLeft:"270px", width:"1640px"}}>
            <Navbar />
            <div className=" ">
                <div className="d-flex justify-content-center profile-bg">
                    <div className="col-lg-8">
                        <div className="d-flex align-items-center justify-content-between">
                        <h3 className="mb-3 mt-5 profile-title">Profile</h3>
                        <div className="d-flex justify-content-end mt-3">
                            <Link to="/home/EditProfile" className="text-decoration-none"><button type="submit" className="d-flex align-items-center btn btn-sm profile-btn "><MdEditSquare className="me-2" />Edit Profile</button></Link>
                        </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="form-group bg-light p-5 rounded d-flex justify-content-center">

                            <div className="me-5">
                                <img src={profile} />
                                <h5 className="mt-3 text-center">Arlene McCoy</h5>
                            </div>

                            <div className="ms-5">
                                <div className="d-flex">
                                    <div className="mb-2 w-50 me-2">
                                        <label htmlFor="name" className="form-label mb-0">First Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                                            id="fname"
                                            {...register('fname', { required: 'First Name is required' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.fname.message}</div>}
                                    </div>

                                    <div className="mb-2 w-50 ms-2">
                                        <label htmlFor="name" className="form-label mb-0">Last Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                                            id="lname"
                                            {...register('lname', { required: 'Last Name is required' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.lname.message}</div>}
                                    </div>
                                </div>

                                <div className="d-flex">
                                    <div className="mb-2 w-50 me-2">
                                        <label htmlFor="name" className="form-label mb-0">Phone Number <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                            id="phone"
                                            {...register('phone', { required: 'Phone Number is required' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.phone.message}</div>}
                                    </div>

                                    <div className="mb-2 w-50 ms-2">
                                        <label htmlFor="name" className="form-label mb-0">Email Address <span className="text-danger">*</span></label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            id="email"
                                            {...register('email', { required: 'Email is required' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.email.message}</div>}
                                    </div>
                                </div>

                                <div className="d-flex">
                                    <div className="mb-2 w-50 me-2">
                                        <label htmlFor="name" className="form-label mb-0">Select Society <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.society ? 'is-invalid' : ''}`}
                                            id="society"
                                            {...register('society', { required: 'Society is required' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.society.message}</div>}
                                    </div>

                                    <div className="mb-2 w-50 ms-2">
                                        <label htmlFor="name" className="form-label mb-0">Country <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                            id="country"
                                            {...register('country', { required: 'Country is required' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.country.message}</div>}
                                    </div>

                                </div>

                                <div className="d-flex">
                                    <div className="mb-2 w-50 me-2">
                                        <label htmlFor="name" className="form-label mb-0">State <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                            id="state"
                                            {...register('state', { required: 'State is required' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.state.message}</div>}
                                    </div>

                                    <div className="mb-2 w-50 ms-2">
                                        <label htmlFor="name" className="form-label mb-0">City <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            id="city"
                                            {...register('city', { required: 'City is required' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.city.message}</div>}
                                    </div>

                                </div>


                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


