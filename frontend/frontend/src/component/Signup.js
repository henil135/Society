import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../index.css';
import signupimg2 from '../assets/signup-img2.png';
import signupimg from '../assets/signup-img.png';
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { createSociety,registerUser,getSocieties } from '../services/authService';

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerNewSociety, handleSubmit: handleNewSubmit, formState: { errors: newSocietyErrors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showForm, setShowForm] = useState({
        First_Name: "",
        Last_Name: "",
        Email_Address: "",
        Phone_Number: "",
        Country: "",
        State: "",
        City: "",
        select_society: "",
        Password: "",
        Confirm_password: "",
    });

    const createnewSociety = () => {
        setShowForm(true);
    };

    const onSubmit = data => {
        console.log(data);
    };

    const handleNewSocietySubmit = newdata => {
        console.log(newdata);
    };



    const [isAgreed, setIsAgreed] = useState(false)
    const [showModel, setShowModal] = useState(false)
    // const [showPassword,ShowConfirmPassword] = useState(false)
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    const toggleTermsAccepted = () => setTermsAccepted(!termsAccepted);

    const [societies, setSocieties] = useState({
        Society_name: "",
        Society_address: "",
        Country: "",
        State: "",
        City: "",
        ZipCode: "",
    })

    const [societies, setSocietiesList] = useState([])

    const [isLoading, setIsLoading] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...FormData, [name]: value })
    };

    const handleCancel = () => {
        setShowForm(false);
        setvalue('society', '')
    };

    const societySubmit = async (data) => {
        try {
            const response = await registerUser(data)
            console.log(data);
            toast.success(response.data.message);
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something Went Wrong')
            console.log(error);
        } finally {
            setUserData({
                First_Name: "",
                Last_Name: "",
                Email_Address: "",
                Phone_Number: "",
                Country: "",
                State: "",
                City: "",
                select_society: "",
                Password: "",
                Confirm_password: "",
            });
        }
    };

    // const togglePasswordVisibility = () => {
    //     showPassword(prev => !prev)
    // }

    const handleSocietieschange = (e) => {
        const { name, value } = e.target;
        setSocieties({ ...societies, [name]: value });
    }

    const handleCreateSociety = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await createSociety(societies);
            toast.success(response.data.message);
            fetchSocieties();
            setShowModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Field to Create Society')
        } finally {
            setSocieties({
                Society_name: "",
                Society_address: "",
                Country: "",
                State: "",
                City: "",
                ZipCode: "",
            })
            setIsLoading(false)
        }
    };
    const handleSocietiesSelect = (e) => {
        const selectedValue = e.target.value;
        setUserData({ ...FormData, select_society: selectedValue });
        if (selectedValue === "createNew") {
            setShowModal(true)
        }
    }
    // Get All Society
    const fetchSocieties = async () => {
        setIsLoading(true);
        try {
            const response = await getSocieties()
            setSocietiesList(response.data.society || [])
        } catch (error) {
            console.error('Error fetching Societies : ', error);
            toast.error('Failed to fetch Societies');
            setSocietiesList([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSocieties();
    }, [])

    return (
        <div className="d-flex flex-column flex-md-row min-vh-100 position-relative">
            {/* Left Side: Image */}
            <div className="signup-img  d-flex flex-column align-items-left" style={{ width: "950px" }}>

                <div className='logo ms-5 mt-3  mb-3 mb-md-0'>
                    <h1><span>Dash</span>Stack</h1>
                </div>

                {/* Center the image vertically in the remaining space */}
                <div className='d-flex align-items-center justify-content-center flex-grow-1'>
                    <img
                        src={showForm ? signupimg2 : signupimg}
                        alt="Society"
                        style={{ opacity: showForm ? 0.6 : 1 }}
                    />
                </div>

            </div>

            {/* Right Side: Form */}
            <div className="signup-form  d-flex align-items-center justify-content-center py-5" style={{ opacity: showForm ? 0.6 : 1, width: "950px" }}>
                <div className="form bg-white p-4 rounded shadow">
                    <h2 className="h4 font-weight-bold mb-4 text-left">Registration</h2>
                    <form onSubmit={handleSubmit(societySubmit)}>
                        {/* First Name, Last Name */}
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>First Name <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        name='First_Name'
                                        placeholder='Enter First Name'
                                        {...register('firstName', { required: 'First Name is required' })}
                                    />
                                    {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>Last Name <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        name='Last_Name'
                                        placeholder='Enter Last Name'
                                        {...register('lastName', { required: 'Last Name is required' })}
                                    />
                                    {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Email Address, Phone Number */}
                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <label>Email Address <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        name='Email_Address'
                                        placeholder='Enter Email Address'
                                        type="email"
                                        {...register('email', { required: 'Email is required' })}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>Phone Number <span className="text-danger">*</span></label>
                                    <input
                                        type='number'
                                        name='Phone_Number'
                                        className="form-control"
                                        placeholder='Enter Phone Number'
                                        {...register('phoneNumber', { required: 'Phone Number is required' })}
                                    />
                                    {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Country, State, City */}
                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <label>Country <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        name='Country'
                                        placeholder='Enter Country'
                                        {...register('country', { required: 'Country is required' })}
                                    />
                                    {errors.country && <p className="text-danger">{errors.country.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>State <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        name='State'
                                        placeholder='Enter State'
                                        {...register('state', { required: 'State is required' })}
                                    />
                                    {errors.state && <p className="text-danger">{errors.state.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>City <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        name='City'
                                        className="form-control"
                                        placeholder='Enter City'
                                        {...register('city', { required: 'City is required' })}
                                    />
                                    {errors.city && <p className="text-danger">{errors.city.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Select Role */}
                        {/* <div className="form-group mt-3">
                            <label>Select Role <span className="text-danger">*</span></label>
                            <select
                                className="form-control"
                                {...register('role', { required: 'Society role is required' })}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Residence">Residence</option>
                                <option value="Security">Security</option>
                            </select>
                            {errors.role && <p className="text-danger">{errors.role.message}</p>}
                        </div> */}

                        {/* Select Society */}
                        <div className="form-group mt-3">
                            <label>Select Society <span className="text-danger">*</span></label>
                            <select
                                className="form-control form-select"
                                id='select'
                                {...register('society', { required: 'Society selection is required' })}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        createnewSociety();
                                    }
                                }}
                            >
                                <option className='option' value="Shantigram residency">Shantigram residency</option>
                                <option value="Russett House Park">Russett House Park</option>
                                <option value="Saurya residency">Saurya residency</option>
                                <option value="Shamruddh Avenyu">Shamruddh Avenyu</option>
                                <option value="Utsav society">Utsav society</option>
                                <option value="Murlidhar">Murlidhar</option>
                                <option value="Shree Sharanam">Shree Sharanam</option>
                                <option value="vasantnagar township">vasantnagar township</option>
                                <option value="" className='create-society-btn'>Create Society</option>
                            </select>
                            {errors.society && <p className="text-danger">{errors.society.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="form-group mt-3 position-relative">
                            <label>Password <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                placeholder='Enter Password'
                                type={showPassword ? "text" : "password"}
                                {...register('password', { required: 'Password is required' })}
                            />
                            <span
                                className="password-icon translate-middle-y pr-3 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                            </span>
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group mt-3 position-relative">
                            <label>Confirm Password <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                placeholder='Confirm Password'
                                type={showConfirmPassword ? "text" : "password"}
                                {...register('confirmPassword', { required: 'Please confirm your password' })}
                            />
                            <span
                                className="password-icon translate-middle-y pr-3 cursor-pointer"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                            </span>
                            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={toggleTermsAccepted}
                                id="termsCheck"
                            />
                            <label className="form-check-label" htmlFor="termsCheck">
                                I agree to the terms and <span className='text-danger'>Privicy Policies.</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn w-100 my-3"
                        >Register</button>

                        <p className='text-center'>Already have an account? <Link to="/login" className='text-danger text-decoration-none'>Login</Link></p>

                    </form>
                </div>
            </div>
            {/* Conditional Form Rendering */}
            <div className='position-absolute top-50 start-50 translate-middle'>
                {showForm && (
                    <div className="new-society-form bg-white shadow p-4">
                        <h3 className="h5 mb-4">Create New Society</h3>

                        <form onSubmit={handleNewSubmit(handleNewSocietySubmit)}>

                            {/* Society Name */}
                            <div className="mb-3">
                                <label className="form-label">Society Name<span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control "
                                    name='Society_name'
                                    placeholder="Enter Society Name"
                                    {...registerNewSociety('name', { required: 'Name is required' })}
                                />
                                {newSocietyErrors.name && <p className="text-danger small">{newSocietyErrors.name.message}</p>}
                            </div>

                            {/* Society Address */}
                            <div className="mb-3">
                                <label className="form-label">Society Address<span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='Society_address'
                                    placeholder="Enter Address"
                                    {...registerNewSociety('address', { required: 'Address is required' })}
                                />
                                {newSocietyErrors.address && <p className="text-danger small">{newSocietyErrors.address.message}</p>}
                            </div>

                            {/* Country and State */}
                            <div className="row g-3 mb-3">
                                <div className="col-md">
                                    <label className="form-label">Country<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='Country'
                                        placeholder='Enter Country'
                                        {...registerNewSociety('country', { required: 'Country is required' })}
                                    />
                                    {newSocietyErrors.country && <p className="text-danger small">{newSocietyErrors.country.message}</p>}
                                </div>

                                <div className="col-md">
                                    <label className="form-label">State<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='State'
                                        placeholder='Enter State'
                                        {...registerNewSociety('state', { required: 'State is required' })}
                                    />
                                    {newSocietyErrors.state && <p className="text-danger small">{newSocietyErrors.state.message}</p>}
                                </div>
                            </div>

                            {/* City and Zip Code */}
                            <div className="row g-3 mb-3">
                                <div className="col-md">
                                    <label className="form-label">City<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='City'
                                        placeholder='Enter City'
                                        {...registerNewSociety('city', { required: 'City is required' })}
                                    />
                                    {newSocietyErrors.city && <p className="text-danger small">{newSocietyErrors.city.message}</p>}
                                </div>

                                <div className="col-md">
                                    <label className="form-label">Zip Code<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ZipCode'
                                        placeholder='Enter Zip Code'
                                        {...registerNewSociety('zipcode', { required: 'Zip Code is required' })}
                                    />
                                    {newSocietyErrors.zipcode && <p className="text-danger small">{newSocietyErrors.zipcode.message}</p>}
                                </div>
                            </div>

                            {/* Cancel and Save Buttons */}
                            <div className="d-flex justify-content-between">
                                <button
                                    type="button" // Change to type button
                                    className="btn cancle mt-2"
                                    onClick={handleCancel}>Cancel</button>

                                <button
                                    type="submit"
                                    className="btn save mt-2">Save</button>
                            </div>

                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
