import React, { useState } from 'react';
import Navbar from './Navbar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function FinancialManagementNote() {
  const [note, setNote] = useState([
    { id: 1, title: 'Rent or Mortgage', des: 'A visual representation of your spending categories.', date: '2024-11-09', amt: '1200' },
    { id: 2, title: 'Housing Costs', des: 'A visual representation of your spending categories.', date: '2024-11-10', amt: '800' },
  ]);

  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Open and close modal
  const handleClose = () => {
    setShow(false);
    reset();
    setEditIndex(null);
  };
  const handleShow = () => setShow(true);

  // Handle form submission
  const onSubmit = (data) => {
    if (editIndex !== null) {
      // Update existing note
      const updatedNotes = [...note];
      updatedNotes[editIndex] = { ...updatedNotes[editIndex], ...data };
      setNote(updatedNotes);
    } else {
      // Add new note
      setNote([...note, { id: note.length + 1, ...data }]);
    }
    handleClose();
  };

  // Handle editing a specific note
  const handleEdit = (index) => {
    setEditIndex(index);
    const noteToEdit = note[index];
    setValue('title', noteToEdit.title);
    setValue('des', noteToEdit.des);
    setValue('date', noteToEdit.date);
    setValue('amt', noteToEdit.amt);
    handleShow();
  };

  // Toggle dropdown menu for each card
  const handleDropdownToggle = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className='dashboard-bg' style={{marginLeft:"270px", width:"1640px"}}>
      <Navbar />
      <div className='container-fluid'>
        <div className='row p-5'>
          <div className='p-0 bg-light'>
            <div className='d-flex justify-content-between align-items-center py-3 px-2'>
              <h3 className='mb-0 financial-income-title'>Note</h3>
              <button className='set-maintainance-btn d-flex align-items-center' onClick={handleShow}>
                Create Note
              </button>
            </div>

            <div className="row px-3">
              {note.map((val, index) => (
                <div className="col-lg-3 mb-3" key={val.id}>
                  <div className="card">
                    <div className="card-header  text-light d-flex align-items-center justify-content-between" style={{ height: "54px", fontSize: "16px", fontWeight: "500" , background:" rgba(86, 120, 233, 1)"}}>
                      {val.title}
                      <div className='position-relative'>
                        <button
                          className="btn btn-light p-0"
                          onClick={() => handleDropdownToggle(index)}
                          style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <BsThreeDotsVertical />
                        </button>
                        {dropdownIndex === index && (
                          <div className="dropdown-menu show position-absolute" style={{ right: 0, top: '100%', zIndex: 10 }}>
                            <button
                              className="dropdown-item"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="card-des-title">Description</h6>
                      <p className="card-text card-des">{val.des}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header>
          <Modal.Title className='Modal-Title'>
            {editIndex !== null ? 'Edit Expense Details' : 'Add Expense Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label className='Form-Label'>Title<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                {...register('title', { required: "Title is required" })}
                isInvalid={errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label className='Form-Label'>Description<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                {...register('des', { required: "Description is required" })}
                isInvalid={errors.des}
              />
              <Form.Control.Feedback type="invalid">{errors.des?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label className='Form-Label'>Date<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="date"
                {...register('date', { required: "Date is required" })}
                isInvalid={errors.date}
              />
              <Form.Control.Feedback type="invalid">{errors.date?.message}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleClose} className="btn mt-2 btn-sm cancle">Cancel</Button>
              <Button variant="primary" type="submit" className='btn btn-sm save mt-2'>Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
