import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { FaPlusSquare } from "react-icons/fa";
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function TotalBalanceChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total Balance',
                data: [10000, 12000, 18000, 25000, 22000, 30000, 35000, 28000, 34000, 40000, 45000, 42000],
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                pointBackgroundColor: '#6366F1',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value / 1000}k`,
                },
            },
        },
    };

    const [contacts, setContacts] = useState([
        { name: 'Hanna Donin', phone: '+91 99587 33657', work: 'Plumber' },
        { name: 'John Doe', phone: '+91 91234 56789', work: 'Electrician' },
        { name: 'Hanna ', phone: '+91 99555 33657', work: 'Plumbering' },
        { name: 'John ', phone: '+91 91222 56789', work: 'Electricians' },
    ]);

    const [show, setShow] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [editIndex, setEditIndex] = useState(null);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        reset();
        setEditIndex(null);
    };

    // Handle adding or updating a contact
    const onSubmit = (data) => {
        const newContact = {
            name: data.fullName,
            phone: data.phoneNumber,
            work: data.work,
        };

        if (editIndex !== null) {
            // Update existing contact
            const updatedContacts = contacts.map((contact, index) =>
                index === editIndex ? newContact : contact
            );
            setContacts(updatedContacts);
        } else {
            // Add new contact
            setContacts([...contacts, newContact]);
        }

        handleClose();
    };



    // Handle editing a contact
    const handleEdit = (index) => {
        const contact = contacts[index];
        setEditIndex(index);
        setShow(true);

        // Populate the form with contact details for editing
        reset({
            fullName: contact.name,
            phoneNumber: contact.phone,
            work: contact.work,
        });
    };

       // New state for delete confirmation modal
       const [showDeleteModal, setShowDeleteModal] = useState(false);
       const [deleteIndex, setDeleteIndex] = useState(null);
   
       // Functions for delete modal
       const handleShowDeleteModal = (index) => {
           setDeleteIndex(index);
           setShowDeleteModal(true);
       };
   
       const handleCloseDeleteModal = () => {
           setShowDeleteModal(false);
           setDeleteIndex(null);
       };
   
       const confirmDelete = () => {
           if (deleteIndex !== null) {
               const updatedContacts = contacts.filter((_, i) => i !== deleteIndex);
               setContacts(updatedContacts);
           }
           handleCloseDeleteModal();
       };

    const [maintenances, setMaintenances] = useState([
        { img: require('../assets/maintainance1.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: require('../assets/maintainance2.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: require('../assets/maintainance3.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: require('../assets/mainatainance4.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: require('../assets/maintainance5.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        // Add more contacts if needed
    ]);

    return (
        <div className='container-fluid py-2'>
            <div className='row px-3 py-1'>
                <div className='col-lg-6 py-0 px-1'>
                    <div className="chart-container" style={{ borderRadius: '12px', background: '#f9fafb', maxWidth: '1000px' }}>
                        <div className='d-flex justify-content-between align-items-center mb-2 '>
                            <h2>Total Balance</h2>
                            <div>
                                <select className='month-btn rounded-2 d-flex align-items-center bg-light text-dark'>
                                    <option>Last week</option>
                                    <option>Last month</option>
                                    <option>Last year</option>
                                </select>
                            </div>
                        </div>
                        <Line data={data} options={options} />
                    </div>
                </div>

                <div className='col-lg-3 px-1 my-sm-3 my-md-0'>
                    <div className="important-member py-4 px-2 bg-white rounded-lg shadow-md max-w-md mx-auto" style={{ borderRadius: '12px', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h2>Important Numbers</h2>
                            <button onClick={handleShow} className='add-btn rounded-2 d-flex align-items-center'>
                                <FaPlusSquare className="me-1" /> Add
                            </button>
                        </div>

                        <div>
                            {contacts.map((contact, index) => (
                                <div key={index} className="py-3 rounded-lg d-flex justify-content-between align-items-center shadow-sm ">
                                    <div>
                                        <p><strong>Name:</strong> {contact.name}</p>
                                        <p><strong>Ph Number:</strong> {contact.phone}</p>
                                        <p><strong>Work:</strong> {contact.work}</p>
                                    </div>
                                    <button onClick={() => handleShowDeleteModal(index)} className="delete-btn">
                                        <RiDeleteBin5Fill />
                                    </button>
                                    <button className="edit-btn" onClick={() => handleEdit(index)}><MdEditSquare /></button>
                                </div>
                            ))}
                        </div>

                        {/* Delete Confirmation Modal */}
                        <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                            <Modal.Header>
                                <Modal.Title className='Modal-Title'>Delete Number?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className='Form-p mb-0'>Are you sure you want to delete this number?</p>
                            </Modal.Body>
                            <Modal.Footer className='d-flex justify-content-between'>
                                <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                                <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>

                {/* Modal for the form */}
                <Modal show={show} onHide={handleClose} centered className="custom-modal">
                    <Modal.Header>
                        <Modal.Title className='Modal-Title'>
                            {editIndex !== null ? 'Edit Important Number' : 'Add Important Number'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formFullName">
                                <Form.Label className='Form-Label'>Full Name<span className="text-danger"> *</span></Form.Label>
                                <Form.Control
                                    className='Form-Control'
                                    type="text"
                                    placeholder="Enter Full Name"
                                    {...register('fullName', { required: "Full Name is required" })}
                                    isInvalid={errors.fullName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhoneNumber">
                                <Form.Label className='Form-Label'>Phone Number<span className="text-danger"> *</span></Form.Label>
                                <Form.Control
                                    className='Form-Control'
                                    type="tel"
                                    placeholder="+91"
                                    {...register('phoneNumber', {
                                        required: "Phone Number is required",
                                        pattern: {
                                            message: "Enter a valid phone number"
                                        }
                                    })}
                                    isInvalid={errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formWork">
                                <Form.Label className='Form-Label'>Work<span className="text-danger"> *</span></Form.Label>
                                <Form.Control
                                    className='Form-Control'
                                    type="text"
                                    placeholder="Enter Work"
                                    {...register('work', { required: "Work is required" })}
                                    isInvalid={errors.work}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.work?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex justify-content-between">
                                <Button variant="secondary" onClick={handleClose} className="btn mt-2 cancle">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" className='btn mt-2 save'>
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>


                <div className='col-lg-3 px-1'>
                    <div className="maintenances py-4 px-2 bg-white rounded-lg shadow-md max-w-md mx-auto" style={{ borderRadius: '12px', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between mb-2">
                            <h2>Pending Maintenances</h2>

                            <p><Link className='text-decoration-none'>View all</Link></p>

                        </div>

                        <div>
                            {maintenances.map((maintenances, index) => (
                                <div key={index} className="py-3 rounded-lg d-flex justify-content-between align-items-center shadow-sm ">
                                    <div className='d-flex'>
                                        <div className='me-2'>
                                            <img src={maintenances.img} />
                                        </div>
                                        <div>
                                            <p className='mb-1 maintenances-p'>{maintenances.name}</p>
                                            <p className='mb-1 maintenances-panding'>{maintenances.pandingMonth}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h6>₹ 5,000</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
