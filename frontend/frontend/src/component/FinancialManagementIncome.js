import React, { useState } from 'react'
import Navbar from './Navbar'
import { IoEyeSharp } from "react-icons/io5";
import balanceRactangle from '../assets/Rectangle 1063.png'
import incomeRactangle from '../assets/Rectangle 1063 (1).png'
import { FaUser } from "react-icons/fa6";
import { BiSolidUserPin } from "react-icons/bi";
import { FaStopwatch } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { Button, Modal, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function FinancialManagementIncome() {

  const [maintenance, setMaintenance] = useState([
    { img: require('../assets/Avatar.png'), name: 'Evelyn Harper', wing: 'A', Unumber: '1001', date: '01/02/2024', status: 'Tenant', Pnumber: '92524 34522', amt: '₹ 1000', penalty: '--', status1: 'Pending', payment: 'Online' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn', wing: 'B', Unumber: '1002', date: '11/02/2024', status: 'Owner', Pnumber: '92524 12365', amt: '₹ 1000', penalty: '250', status1: 'Done', payment: 'Cash' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn Harper', wing: 'A', Unumber: '1001', date: '01/02/2024', status: 'Tenant', Pnumber: '92524 34522', amt: '₹ 1000', penalty: '--', status1: 'Pending', payment: 'Online' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn', wing: 'B', Unumber: '1002', date: '11/02/2024', status: 'Owner', Pnumber: '92524 12365', amt: '₹ 1000', penalty: '250', status1: 'Done', payment: 'Cash' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn Harper', wing: 'A', Unumber: '1001', date: '01/02/2024', status: 'Tenant', Pnumber: '92524 34522', amt: '₹ 1000', penalty: '--', status1: 'Pending', payment: 'Online' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn', wing: 'B', Unumber: '1002', date: '11/02/2024', status: 'Owner', Pnumber: '92524 12365', amt: '₹ 1000', penalty: '250', status1: 'Done', payment: 'Cash' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn Harper', wing: 'A', Unumber: '1001', date: '01/02/2024', status: 'Tenant', Pnumber: '92524 34522', amt: '₹ 1000', penalty: '--', status1: 'Pending', payment: 'Online' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn', wing: 'B', Unumber: '1002', date: '11/02/2024', status: 'Owner', Pnumber: '92524 12365', amt: '₹ 1000', penalty: '250', status1: 'Done', payment: 'Cash' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn Harper', wing: 'A', Unumber: '1001', date: '01/02/2024', status: 'Tenant', Pnumber: '92524 34522', amt: '₹ 1000', penalty: '--', status1: 'Pending', payment: 'Online' },

    { img: require('../assets/Avatar.png'), name: 'Evelyn', wing: 'B', Unumber: '1002', date: '11/02/2024', status: 'Owner', Pnumber: '92524 12365', amt: '₹ 1000', penalty: '250', status1: 'Done', payment: 'Cash' },

  ])


  const [showViewModal, setShowViewModal] = useState(false);
  const [viewComplaint, setViewComplaint] = useState(null);

  const handleShowViewModal = (index) => {
    setViewComplaint(maintenance[index]);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const [showSetMaintenanceModal, setShowSetMaintenanceModal] = useState(false);

  const handleShowSetMaintenanceModal = () => setShowSetMaintenanceModal(true);
  const handleCloseSetMaintenanceModal = () => setShowSetMaintenanceModal(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [showAddMaintenanceModal, setShowAddMaintenanceModal] = useState(false);

  const handleShowAddMaintenanceModal = () =>{  
    setShowSetMaintenanceModal(false);
    setShowAddMaintenanceModal(true)
}
  const handleCloseAddMaintenanceModal = () => setShowAddMaintenanceModal(false);

 

  return (
    <div className='card-row dashboard-bg'  style={{marginLeft:"270px", width:"1620px"}}>
      <Navbar />
      <div className='dashboard-bg'>
        <div className='container-fluid mt-2' style={{marginLeft:"5px"}}>

          <div className='row justify-content-between align-items-center mb-3 pt-2 bg-light mx-0'>
          <div className="col-lg-8 col-md-12 d-flex flex-wrap" >
            {/* Maintenance Amount Card */}
            <div className="col-lg-4 col-md-6 col-sm-12 py-2 px-1" >
              <div className="card border-0 financial-amt-card-shadow">
                <div className="card-body d-flex align-items-center">
                  <img src={incomeRactangle} width={8} className="me-2" alt="Icon" />
                  <div>
                    <h6 className="card-subtitle mb-1">Maintenance Amount</h6>
                    <p className="mb-0">₹ 0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Penalty Amount Card */}
            <div className="col-lg-4 col-md-6 col-sm-12 py-2 px-1">
              <div className="card border-0 financial-amt-card-shadow">
                <div className="card-body d-flex align-items-center">
                  <img src={balanceRactangle} width={8} className="me-2" alt="Icon" />
                  <div>
                    <h6 className="card-subtitle mb-1">Penalty Amount</h6>
                    <p className="mb-0">₹ 0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Set Maintenance Button */}
          <div className="col-auto">
            <button
              className="btn btn-primary set-maintainance-btn border-0 py-3 px-3"
              onClick={handleShowSetMaintenanceModal}
            >
              Set Maintenance
            </button>
          </div>
        </div>

            {/* Set Maintenance Modal */}
            <Modal show={showSetMaintenanceModal} className='custom-modal' onHide={handleCloseSetMaintenanceModal} centered>
              <Modal.Header>
                <Modal.Title>Set Maintenance</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className='relative'
                        required
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '30px',
                          bottom: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: '#6c757d'
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="secondary" className="btn mt-2 cancle" onClick={handleCloseSetMaintenanceModal}>Cancel</Button>
                    <Button variant="primary" className='btn mt-2 save' onClick={handleShowAddMaintenanceModal}>Continue</Button>
                  </div>

                </Form>
              </Modal.Body>
            </Modal>

            {/* Add Maintenance Modal */}
            <Modal show={showAddMaintenanceModal} className='custom-modal' onHide={handleCloseAddMaintenanceModal} centered>
              <Modal.Header>
                <Modal.Title>Add Maintenance Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <div className='d-flex'>
                  <Form.Group controlId="formName" className='me-3'>
                    <Form.Label className='Form-Label'>Maintenance Amount</Form.Label>
                    <Form.Control className='Form-Control' type="text" placeholder="₹ 0000" required />
                  </Form.Group>

                  <Form.Group controlId="formName">
                    <Form.Label className='Form-Label'>Penalty Amount</Form.Label>
                    <Form.Control className='Form-Control' type="text" placeholder="₹ 0000" required />
                  </Form.Group>
                  </div>

                  <Form.Group controlId="formUnit">
                    <Form.Label className='Form-Label'>Maintenance Due Date</Form.Label>
                    <Form.Control className='Form-Control' type="date" placeholder="Select Due Date" required />
                  </Form.Group>

                  <Form.Group controlId="formAmount">
                    <Form.Label className='Form-Label'>Penalty Applied After Day Selection</Form.Label>
                    <Form.Control className='Form-Control' type="text" placeholder="Penalty Applied After Day Selection" required />
                  </Form.Group>

                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="secondary" className="btn mt-2 cancle" onClick={handleCloseAddMaintenanceModal}>Cancel</Button>
                    <Button variant="primary" className='btn mt-2 save' onClick={() => {/* Add submit logic here */ }}>
                      Save
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>

          </div>

          <div className='row px-3 pb-3'>
              <div className="table-responsive rounded">

                <Link to="/home/Financial-Maintenanace" className='btn btn-sm  maintainance-income-btn maintainance-income-btn-bg'>Maintenance</Link>

                <Link to="/home/Other-Income" className='btn btn-sm  maintainance-income-btn maintainance-income-btn-withoutbg'>Other Income</Link>

                <div className='bg-light' style={{width:"1600px"}}>
                  <h3 className=' mb-0 py-3 ps-2 financial-income-title'>Maintenance  Details</h3>
                  <div className='px-3 financial-maintainance-table '>
                    <table className="table">

                      <thead className='table-primary '>
                        <tr style={{ height: '55px' }}>
                          <th scope="col">Name</th>
                          <th scope="col">Unit Number</th>
                          <th scope="col" className='text-center'>Date</th>
                          <th scope="col" className='text-center'>Status</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Penalty</th>
                          <th scope="col" className='text-center'>Status</th>
                          <th scope="col" className='text-center'>Payment</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          maintenance.map((val, index) => {
                            return (
                              <tr key={index} className='bg-light'>

                                <td style={{ height: '55px' }} className='financial-Pnumber'><img src={val.img} className='me-2' height={40} />{val.name}</td>


                                <td style={{ height: '55px' }} className='financial-Pnumber'><span className='wing-name'>{val.wing}</span> {val.Unumber}</td>

                                <td style={{ height: '55px' }} className='financial-Pnumber'>{val.date}</td>

                                <td
                                  style={{
                                    height: '55px'
                                  }}
                                >
                                  <span className='financial-status-btn' style={{
                                    backgroundColor: val.status === 'Tenant' ? 'rgba(255, 241, 248, 1)' : 'rgba(241, 240, 255, 1)',
                                    color: val.status === 'Tenant' ? 'rgba(236, 72, 153, 1)' : 'rgba(79, 70, 229, 1)',
                                  }}>
                                    {val.status === 'Tenant' ? <FaUser className='me-1' style={{ fontSize: '16px' }} /> : <BiSolidUserPin className='me-1' style={{ fontSize: '16px' }} />}
                                    {val.status}
                                  </span>
                                </td>


                                <td style={{ height: '55px' }} className='financial-Pnumber'>{val.Pnumber}</td>

                                <td style={{ height: '55px' }} className='amt'>{val.amt}</td>

                                <td style={{ height: '55px' }}>
                                  <span
                                    className='financial-penalty-btn btn btn-sm d-flex justify-content-center align-items-center'
                                    style={{
                                      backgroundColor: val.penalty === '--' ? 'rgba(246, 248, 251, 1)' : 'rgba(231, 76, 60, 1)',
                                      color: val.penalty === '--' ? 'rgba(79, 79, 79, 1)' : 'rgba(255, 255, 255, 1)',
                                    }}
                                  >
                                    {val.penalty}
                                  </span>
                                </td>

                                <td style={{ height: '55px' }} >
                                  <span
                                    className='financial-status-btn btn btn-sm d-flex justify-content-center align-items-center'
                                    style={{
                                      backgroundColor: val.status1 === 'Pending' ? 'rgba(255, 195, 19, 0.1)' : 'rgba(57, 151, 61, 0.1)',
                                      color: val.status1 === 'Pending' ? 'rgba(255, 195, 19, 1)' : 'rgba(57, 151, 61, 1)',
                                    }}
                                  >
                                    {val.status1 === 'Pending' ? <FaStopwatch className='me-1' style={{ fontSize: '16px' }} /> : <RiVerifiedBadgeFill className='me-1' style={{ fontSize: '16px' }} />}
                                    {val.status1}
                                  </span>
                                </td>

                                <td style={{ height: '55px' }}>
                                  <span
                                    className='financial-status-btn btn btn-sm d-flex justify-content-center align-items-center'
                                    style={{
                                      backgroundColor: val.payment === 'Online' ? 'rgba(86, 120, 233, 0.1)' : 'rgba(32, 34, 36, 0.05)',
                                      color: val.payment === 'Online' ? 'rgba(86, 120, 233, 1)' : 'rgba(32, 34, 36, 1)',
                                    }}
                                  >
                                    {val.payment === 'Online' ? <FaWallet className='me-1' style={{ fontSize: '16px' }} /> : <FaMoneyBill className='me-1' style={{ fontSize: '16px' }} />}
                                    {val.payment}
                                  </span>
                                </td>

                                <td className='d-flex' style={{ height: '55px' }}>

                                  <button className='border-0 bg-light' onClick={() => handleShowViewModal(index)}>
                                    <IoEyeSharp className='view-btn' />
                                  </button>

                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* View Modal */}
                <Modal show={showViewModal} className='custom-modal' onHide={handleCloseViewModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>View Maintenance Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {viewComplaint && (
                      <div>

                        <div className='d-flex align-items-center mb-4'>
                          <img src={viewComplaint.img} className='me-3' width={70} /><p className='mb-0 view-p'>{viewComplaint.name}<br /><span className='view-span'>{viewComplaint.date}</span></p>
                        </div>


                        <div className='d-flex justify-content-between'>

                          <div className='text-center'>
                            <strong className='view-strong'>Wing</strong><p className='wing-name d-flex flex-column mt-1 status-btn text-center' >
                              {viewComplaint.wing}
                            </p>
                          </div>
                          <div className='text-center'>
                            <strong className='view-strong'>Unit</strong><p className='financial-Pnumber mt-1 status-btn text-center' >
                              {viewComplaint.Unumber}
                            </p>
                          </div>

                          <div className='text-center'>
                            <strong className='view-strong'>Status</strong><p className='view-strong mt-1 status-btn text-center' style={{
                              backgroundColor: viewComplaint.status === 'Tenant' ? 'rgba(255, 241, 248, 1)' : 'rgba(241, 240, 255, 1)',
                              color: viewComplaint.status === 'Tenant' ? 'rgba(236, 72, 153, 1)' : 'rgba(79, 70, 229, 1)',
                            }} >
                              {viewComplaint.status === 'Tenant' ? <FaUser className='me-1' style={{ fontSize: '16px' }} /> : <BiSolidUserPin className='me-1' style={{ fontSize: '16px' }} />}
                              {viewComplaint.status}
                            </p>
                          </div>

                          <div className='text-center'>
                            <strong className='view-strong'>Amount</strong><p className='amt mt-1 status-btn text-center' >
                              {viewComplaint.amt}
                            </p>
                          </div>
                        </div>


                        <div className='d-flex justify-content-between'>
                          <div className='text-center'>
                            <strong className='view-strong'>Penalty</strong><p className='view-strong mt-1 status-btn text-center' style={{
                              backgroundColor: viewComplaint.penalty === '--' ? 'rgba(246, 248, 251, 1)' : 'rgba(231, 76, 60, 1)',
                              color: viewComplaint.penalty === '--' ? 'rgba(79, 79, 79, 1)' : 'rgba(255, 255, 255, 1)',
                            }} >
                              {viewComplaint.penalty}
                            </p>
                          </div>

                          <div className='text-center'>
                            <strong className='view-strong'>Status</strong><p className='view-strong mt-1 status-btn text-center' style={{
                              backgroundColor: viewComplaint.status1 === 'Pending' ? 'rgba(255, 195, 19, 0.1)' : 'rgba(57, 151, 61, 0.1)',
                              color: viewComplaint.status1 === 'Pending' ? 'rgba(255, 195, 19, 1)' : 'rgba(57, 151, 61, 1)',
                            }} >
                              {viewComplaint.status1 === 'Pending' ? <FaStopwatch className='me-1' style={{ fontSize: '16px' }} /> : <RiVerifiedBadgeFill className='me-1' style={{ fontSize: '16px' }} />}
                              {viewComplaint.status1}
                            </p>
                          </div>

                          <div className='text-center'>
                            <strong className='view-strong'>Payment</strong><p className='view-strong mt-1 status-btn text-center' style={{
                              backgroundColor: viewComplaint.payment === 'Online' ? 'rgba(86, 120, 233, 0.1)' : 'rgba(32, 34, 36, 0.05)',
                              color: viewComplaint.payment === 'Online' ? 'rgba(86, 120, 233, 1)' : 'rgba(32, 34, 36, 1)',
                            }} >
                              {viewComplaint.payment === 'Online' ? <FaWallet className='me-1' style={{ fontSize: '16px' }} /> : <FaMoneyBill className='me-1' style={{ fontSize: '16px' }} />}
                              {viewComplaint.payment}
                            </p>
                          </div>
                        </div>

                      </div>
                    )}
                  </Modal.Body>
                </Modal>
              </div>
          </div>
        </div>
      </div>
  )
} 