import React, { useState } from 'react';
import Navbar from './Navbar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdAccessTimeFilled } from "react-icons/md";

export default function Announcement() {

    const [note, setNote] = useState([
        { id: 1, title: 'Community Initiatives', date: '01/02/2024', time: '10:15 AM', des: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.' },

        { id: 2, title: 'Community Initiatives', date: '01/02/2024', time: '10:15 AM', des: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.' },

        { id: 3, title: 'Community Initiatives', date: '01/02/2024', time: '10:15 AM', des: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.' },

        { id: 4, title: 'Community Initiatives', date: '01/02/2024', time: '10:15 AM', des: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.' },

    ]);

    const [show, setShow] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const handleClose = () => {
        setShow(false);
        reset();
        setEditIndex(null);
    };

    const handleShow = () => setShow(true);

    const onSubmit = (data) => {
        if (editIndex !== null) {
            const updatedNotes = [...note];
            updatedNotes[editIndex] = { ...updatedNotes[editIndex], ...data };
            setNote(updatedNotes);
        } else {
            setNote([...note, { id: note.length + 1, ...data }]);
        }
        handleClose();
    };


    const [dropdownIndex, setDropdownIndex] = useState(null);

    const handleView = (index) => {
        console.log("View item:", note[index]);
        // Implement view modal logic here
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
            const updatedNotes = note.filter((_, i) => i !== deleteIndex);
            setNote(updatedNotes);
        }
        handleCloseDeleteModal();
    };

    const handleShowEditModal = (index) => {
        setEditIndex(index);
        const selectedNote = note[index];
        setValue('title', selectedNote.title);
        setValue('amtPerMember', selectedNote.amtPerMember);
        setValue('date', selectedNote.date);
        setValue('dueDate', selectedNote.dueDate);
        setValue('des', selectedNote.des);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        reset();
        setEditIndex(null);
    };

    const [showViewModal, setShowViewModal] = useState(false);
    const [viewComplaint, setViewComplaint] = useState(null);

    const handleShowViewModal = (index) => {
        setViewComplaint(note[index]);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);

    const [showSetMaintenanceModal, setShowSetMaintenanceModal] = useState(false);

    return (
        <div className='dashboard-bg' style={{marginLeft:"270px"}}>
            <Navbar />
            <div>
                <div className='container-fluid'>
                    <div className='row p-5'>
                        <div className='p-0'>
                            <div className='bg-light'>
                                <div className='d-flex justify-content-between align-items-center  py-3 px-2'>
                                    <h3 className=' mb-0  financial-income-title' style={{marginLeft:"10px"}}>Announcement</h3>

                                    <div>
                                        <button className='set-maintainance-btn d-flex align-items-center other-income-btn' style={{marginRight:"10px"}} onClick={handleShow}> Create Announcement</button>
                                    </div>
                                </div>

                                {/* Modal */}
                                {show && (
                                    <div className="modal fade show d-block  custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">

                                                <h5 className="modal-title Modal-Title p-3 pb-0">Add Announcement</h5>

                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="modal-body">
                                                        <div className="mb-3">
                                                            <label className='Form-Label'>Announcement Title <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control Form-Control"
                                                                placeholder='Enter Name' {...register('title', { required: true })} />
                                                            {errors.title && <small className="text-danger">Title is required</small>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className='Form-Label'>Description <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control Form-Control" placeholder='Enter Description' {...register('des', { required: true })} />
                                                            {errors.amt && <small className="text-danger">Description is required</small>}
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className="mb-3 w-50 me-2">
                                                                <label className='Form-Label'>Announcement Date <span className='text-danger'>*</span></label>
                                                                <input type="date" className="form-control Form-Control" {...register('date', { required: true })} />
                                                            </div>
                                                            <div className="mb-3 w-50 ms-2">
                                                                <label className='Form-Label'>Announcement Time <span className='text-danger position-relative'>*</span></label>
                                                                <input type="text" className="form-control Form-Control" {...register('time', { required: true })} /><MdAccessTimeFilled className='position-absolute anouncement-icon' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="px-3 pb-3 d-flex justify-content-between">
                                                        <button type="button" className="btn btn-sm cancle" onClick={handleClose}>Cancel</button>
                                                        <button type="submit" className="btn btn-sm save">Save</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                <div className="row card-row g-3 ps-3">
                                    {note.map((val, index) => (
                                        <div className="col-lg-3 mb-3" key={val.id}>
                                            <div className="card">
                                                <div className="card-header card-title text-light d-flex align-items-center justify-content-between" style={{ height: "54px", fontSize: "16px", fontWeight: "500" , background:" rgba(86, 120, 233, 1)"}}>
                                                    {val.title}
                                                    <div className='position-relative'>
                                                        {/* Three dots button */}
                                                        <button
                                                            className="btn btn-light p-0"
                                                            onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
                                                            style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        >
                                                            <BsThreeDotsVertical />
                                                        </button>

                                                        {/* Dropdown Menu */}
                                                        {dropdownIndex === index && (
                                                            <div className="dropdown-menu show position-absolute" style={{ right: 0, top: '100%', zIndex: 10 }}>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShowEditModal(index)}
                                                                >
                                                                    Edit
                                                                </button>


                                                                {/* Edit Modal */}
                                                                {showEditModal && (
                                                                    <div className="modal fade show d-block custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">

                                                                                <h5 className="modal-title p-3 pb-0">Edit Announcement</h5>


                                                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                                                    <div className="modal-body">
                                                                                        <div className="mb-3">
                                                                                            <label className='Form-Label'>Announcement Title<span className='text-danger'>*</span></label>
                                                                                            <input type="text" className="form-control Form-Control" {...register('title', { required: true })} />
                                                                                            {errors.title && <small className="text-danger">Amount is required</small>}
                                                                                        </div>

                                                                                        <div className="mb-3">
                                                                                            <label className='Form-Label'>Description <span className='text-danger'>*</span></label>
                                                                                            <input type="text" className="form-control Form-Control" placeholder='Enter Description' {...register('des', { required: true })} />
                                                                                            {errors.amt && <small className="text-danger">Description is required</small>}
                                                                                        </div>

                                                                                        <div className='d-flex justify-content-between'>
                                                                                            <div className="mb-3">
                                                                                                <label className='Form-Label'>Announcement Date<span className='text-danger'>*</span></label>
                                                                                                <input type="date" className="form-control Form-Control w-100" {...register('date', { required: true })} />
                                                                                            </div>
                                                                                            <div className="mb-3">
                                                                                                <label className='Form-Label'>Announcement time<span className='text-danger'>*</span></label>
                                                                                                <input type="text" className="form-control Form-Control" {...register('time', { required: true })} /><MdAccessTimeFilled className='position-absolute anouncement-icon' />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="px-3 pb-3 d-flex justify-content-between">
                                                                                        <button type="button" className="btn btn-sm cancle" onClick={handleCloseEditModal}>Cancel</button>
                                                                                        <button type="submit" className="btn btn-sm save">Save</button>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShowViewModal(index)}
                                                                >
                                                                    View
                                                                </button>

                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShowDeleteModal(index)}
                                                                >
                                                                    Delete
                                                                </button>

                                                                {/* delete modal */}
                                                                <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>

                                                                    <Modal.Title className='Modal-Title px-3 pt-3'>Delete Number?</Modal.Title>

                                                                    <Modal.Body>
                                                                        <p className='Form-p mb-0'>Are you sure you want to delete this Security?</p>
                                                                    </Modal.Body>

                                                                    <Modal.Footer className='d-flex justify-content-between'>
                                                                        <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                                                                        <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                                                                    </Modal.Footer>
                                                                </Modal>

                                                                {/* View Modal */}
                                                                <Modal show={showViewModal} className='custom-modal custom-modal' onHide={handleCloseViewModal} centered>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>View Security Protocol</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        {viewComplaint && (
                                                                            <div>

                                                                                <div className='mb-4'>
                                                                                    <label className='anouncement-view-title'>Title</label>
                                                                                    <p className='mb-0 anouncement-view-p'>{viewComplaint.title}</p>
                                                                                </div>

                                                                                <div className='mb-4'>
                                                                                    <label className='anouncement-view-title'>Description</label>
                                                                                    <p className='mb-0 anouncement-view-p'>{viewComplaint.des}</p>
                                                                                </div>

                                                                                <div className='d-flex'>
                                                                                <div className='mb-4'>
                                                                                    <label className='anouncement-view-title'>Date</label>
                                                                                    <p className='mb-0 anouncement-view-p'>{viewComplaint.date}</p>
                                                                                </div>
                                                                                <div className='mb-4 ms-5'>
                                                                                    <label className='anouncement-view-title'>Time</label>
                                                                                    <p className='mb-0 anouncement-view-p'>{viewComplaint.time}</p>
                                                                                </div>
                                                                                </div>

                                                                            </div>
                                                                        )}
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h6 className="card-body-title mb-0">Announcement Date</h6>
                                                        <span className="card-body-title text-dark mb-0 fw-medium">{val.date}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h6 className="card-body-title mb-0">Announcement Time</h6>
                                                        <span className="card-body-title text-dark mb-0 fw-medium">{val.time}</span>
                                                    </div>
                                                    <h6 className="card-body-title mb-2">Description</h6>
                                                    <p className="card-text card-des fw-medium">{val.des}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

