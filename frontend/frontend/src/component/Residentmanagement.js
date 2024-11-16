import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaHome, FaTag, FaEye, FaEdit, FaPlus } from 'react-icons/fa'; // Using react-icons as placeholders
import Sidebar from '../component/Layout/Sidebar';
import '../style.css';
import Avtar from '../assets/Avatar.png';
import Header from './Navbar';


export default function ResidentManagement() {
  const [residents, setResidents] = useState([
    {id:1, name: "Evelyn Harper", unit: 'A', Number: "1001", unitStatus: "Occupied", residentStatus: "Tenant", phoneNumber: "97587 85828", members: 1, vehicles: 2 },
    {id:2, name: "-", unit: "B", Number: "1002", unitStatus: "Vacate", residentStatus: "--", phoneNumber: "--", members: "-", vehicles: "-" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showVacateModal, setShowVacateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // New modal state for create modal
  const [selectedStatus, setSelectedStatus] = useState("");
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const navigate = useNavigate();
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseVacateModal = () => setShowVacateModal(false);
  const handleCloseCreateModal = () => setShowCreateModal(false); // Close create modal

  const handleSave = () => {
    if (selectedStatus === "Occupied" && agreeChecked) {
      navigate('/home/residentForm');
    } else if (selectedStatus === "Vacate") {
      setShowVacateModal(true);
    }
    handleCloseModal();
  };

  const handleCreateClick = () => {
    setShowVacateModal(false); // Close the vacate modal
    setShowCreateModal(true); // Open the create modal
  };

  const handleDelete = () => {
    if (idToDelete) {
      console.log("Deleting ID:", idToDelete); // Perform the delete action here (e.g., API call or state update)
      // Reset the ID after deletion
      setIdToDelete(null);
    }
    handleCloseCreateModal();
  };
  const imageColumnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1  dashboard-bg container-fluid" style={{marginLeft:"270px", width:"1642px"}}>
        <Header/>
        <div className="container-fluid  " style={{ marginTop: "20px" }}>
         

          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px",marginLeft:"10px" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            
            <h4>Resident Tenant and Owner Details</h4>
           
            <Button onClick={handleOpenModal} className="mainColor2 mt-3 mt-md-0 justify-content-center">
              <FaPlus style={{ fontSize: "18px", borderRadius: "5px", background: "rgba(255, 255, 255, 1)", color: "#FE512E", marginRight: "8px" }} />
              Add New Resident Details
            </Button>
          
          </div>
            <table className="table striped hover responsive">
              
              <thead>
                <tr className="rmHead">
                  <th
                    className="text-start"
                    style={{
                      padding: "10px",
                      width: "200px",
                      background: "rgb(185, 198, 242)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "21px",
                      textAlign: "left",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                    }}
                  >
                    Full Name
                  </th>

                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Unit Number</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Unit Status</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Resident Status</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Phone Number</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "130px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Members</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "130px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Vehicle</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((resident, index) => (
                  <tr key={index} className="align-middle">
                    <td className="px-3">
                      <div style={imageColumnStyle} className="text-center">
                        <img
                          src={Avtar}
                          alt="avatar"
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "36px",
                            border: "2px solid #F4F4F4",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "24px",
                            textAlign: "left",
                          }}
                        >
                          {resident.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                        {resident.unit}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
                        {resident.Number}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: resident.unitStatus === "Occupied" ? "#ECFFFF" :
                            resident.unitStatus === "Vacate" ? "#FFF6FF" : "#F6F8FB",
                          color: resident.unitStatus === "Occupied" ? "#14B8A6" :
                            resident.unitStatus === "Vacate" ? "#9333EA" : "#202224",
                        }}
                      >
                        {resident.unitStatus === 'Occupied' ? <span><FaHome />  Occupide</span> : (resident.unitStatus === 'Vacate' ? <span><FaTag />  Vacate</span> : <FaHome />)}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: resident.residentStatus === "Tenant" ? "#FFF1F8" :
                            resident.residentStatus === "Owner" ? "#F1F0FF" : "#F6F8FB",
                          color: resident.residentStatus === "Tenant" ? "#EC4899" :
                            resident.residentStatus === "Owner" ? "#4F46E5" : "#202224",
                        }}
                      >
                        {resident.residentStatus === "Tenant" ? <span><FaUser />  Tenant</span> : (resident.residentStatus === "Owner" ? <FaTag /> : "--")}
                      </span>
                    </td>
                    <td className="text-center px-3">{resident.phoneNumber}</td>
                    <td className="text-center">{resident.members}</td>
                    <td className="text-center">{resident.vehicles}</td>

                    <td className="text-center"
                    style={{ verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaEdit className="text-success me-2" onClick={handleOpenModal} style={{ cursor: "pointer", width: "20px" }}  />
                        <FaEye className="text-primary me-2"  style={{ cursor: "pointer", width: "20px" }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
          <Modal className="square-modal" show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header >
              <Modal.Title>Residence Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="residence-status-modal">
                <Form>
                  <div className="d-flex mb-3" style={{ gap: "70px" }}>
                    <Form.Check
                      style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px",paddingTop:"8px",paddingBottom: "8px", paddingRight: "30px", borderRadius: "5px" }}
                      type="radio"
                      label="Occupied"
                      name="residenceStatus"
                      value="Occupied"
                      checked={selectedStatus === "Occupied"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                    <Form.Check
                      style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px",paddingTop:"8px",paddingBottom: "8px", paddingRight: "30px", borderRadius: "5px" }}
                      type="radio"
                      label="Vacate"
                      name="residenceStatus"
                      value="Vacate"
                      checked={selectedStatus === "Vacate"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                  </div>
                  <Form.Check
                    type="checkbox"
                    label={`By submitting, you agree to select ${selectedStatus}.`}
                    checked={agreeChecked}
                    onChange={(e) => setAgreeChecked(e.target.checked)}
                    className="mb-3"
                  />
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              <Button  style={{width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",}} className="mainColor2" onClick={handleSave} disabled={!agreeChecked}>Save</Button>
            </Modal.Footer>
          </Modal>

          <Modal className="square-modal" show={showVacateModal} onHide={handleCloseVacateModal} centered>
        <Modal.Header >
          <Modal.Title>Residence Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex align-items-center gap-4">
            <Form.Group controlId="wingSelect" className="flex-grow-1">
              <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
              <Form.Control as="select">
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
                <option>G</option>
                <option>H</option>
                <option>I</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="unitSelect" className="flex-grow-1">
              <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
              <Form.Control as="select">
                <option>1001</option>
                <option>1002</option>
                <option>1003</option>
                <option>1004</option>
                <option>2001</option>
                <option>2002</option>
                <option>2003</option>
                <option>2004</option>
                <option>3001</option>
                <option>3002</option>
                <option>3003</option>
                <option>3004</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{width: "175px",height: "51px",border: "1px solid #202224",padding: "10px 55px 10px 55px",background: "#FFFFFF",color: "#202224",}}variant="secondary" onClick={handleCloseVacateModal}>Cancel</Button>
          <Button style={{width: "175px",height: "51px",border: "1px",padding: "10px 55px 10px 55px",color: "#202224",}} className="mainColor2" onClick={handleCreateClick}>Create</Button>
        </Modal.Footer>
      </Modal>

      {/* New Create Modal */}
      <Modal  className="Round-modal" show={showCreateModal} onHide={handleCloseCreateModal} centered>
        <Modal.Header >
          <Modal.Title><strong>Do you want to vacate the finlay flat?</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delate all details?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  style={{width: "175px",height: "51px",border: "1px solid #202224",padding: "10px 55px 10px 55px",background: "#FFFFFF",color: "#202224",}} onClick={handleCloseCreateModal}>Cancle</Button>
          <Button style={{width: "175px",height: "51px",border: "1px",padding: "10px 55px 10px 55px",color: "white",background:" rgba(231, 76, 60, 1)"}} variant="secondary" onClick={handleDelete}>Conform</Button>
        </Modal.Footer>
      </Modal>
        </div>
      </div>
    </div>
  );
}
