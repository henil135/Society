import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "./Layout/Sidebar";
import { FaPlus } from "react-icons/fa";
import Header from "./Navbar";

const FacilityCard = ({ title, date, description, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleIconClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4 position-relative">
      <Card className="shadow-sm h-100">
        <Card.Header
          className="text-white d-flex justify-content-between align-items-center"
          style={{ background: "#5678E9" }}
        >
          {title}
          <BsThreeDotsVertical onClick={handleIconClick} style={{ cursor: "pointer" }} />
        </Card.Header>
        <Card.Body>
          <p className="mb-1" style={{ fontSize: "12px", color: "gray" }}>
            <strong>Upcoming Schedule Service Date:</strong> {date}
          </p>
          <h5 className="card-title" style={{ fontSize: "15px", color: "gray" }}>
            Description
          </h5>
          <p className="card-text" style={{ fontSize: "13px" }}>{description}</p>
        </Card.Body>

        {/* Dropdown menu */}
        {showMenu && (
          <div
            className="position-absolute bg-white border rounded shadow-sm p-2"
            style={{
              top: "40px",
              right: "10px",
              zIndex: 10,
            }}
            onClick={() => setShowMenu(false)}
          >
            <div
              className="dropdown-item"
              onClick={onEdit}
              style={{ cursor: "pointer" }}
            >
              Edit
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([
    { title: "Parking Facilities", date: "01/07/2024", description: "Description here." },
    { title: "Community Center", date: "01/07/2024", description: "Description here." },
    { title: "Swimming Pool", date: "01/07/2024", description: "Description here." },
    { title: "Wi-Fi and Connectivity", date: "01/07/2024", description: "Description here." },
    { title: "Parking Facilities", date: "01/07/2024", description: "Description here." },
    { title: "Community Center", date: "01/07/2024", description: "Description here." },
    
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [facilityData, setFacilityData] = useState({ title: "", date: "", description: "", reminderBefore: "" });
  const [validationError, setValidationError] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFacilityData({ title: "", date: "", description: "", reminderBefore: "" });
    setIsEditing(false);
    setEditIndex(null);
    setValidationError(""); // Clear validation error
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacilityData({ ...facilityData, [name]: value });
  };

  const handleSave = () => {
    const { title, date, description, reminderBefore } = facilityData;

    // Field validation
    if (!title || !date || !description || !reminderBefore) {
      setValidationError("All fields are required.");
      return;
    }

    // Validation for reminderBefore input
    if (isNaN(reminderBefore) || reminderBefore <= 0) {
      setValidationError("Reminder Before must be a positive number.");
      return;
    }

    // If there's no validation error, proceed with saving the facility
    if (isEditing) {
      const updatedFacilities = [...facilities];
      updatedFacilities[editIndex] = facilityData;
      setFacilities(updatedFacilities);
    } else {
      setFacilities([...facilities, facilityData]);
    }

    handleCloseModal();
  };

  const handleEdit = (index) => {
    setFacilityData(facilities[index]);
    setEditIndex(index);
    setIsEditing(true);
    handleShowModal();
  };

  return (
    <div className="d-flex flex-column flex-md-row">
    <div className="flex-shrink-0" >
      <Sidebar />
    </div>

      
      <div className="  dashboard-bg " style={{marginLeft:"270px", width:"1642px"}}>
        <Header/>
        <div className="container-fluid bg-white rounded shadow-sm p-5" style={{ marginTop: "20px",width:"1550px"}}>
           <div className="d-flex" style={{justifyContent:"space-between"}}>
          <h3>Facility Management</h3>
          
          
          <Button className="text-white mainColor2" onClick={() => {
            setIsEditing(false);
            handleShowModal();
          }}> <FaPlus
          style={{
            fontSize: "18px",
            borderRadius: "5px",
            background: "rgba(255, 255, 255, 1)",
            color: "#FE512E",
            marginRight: "8px",
          }}
        />
            Create Facility
          </Button>
         </div>
        

        {/* Facility Cards */}
        <div className="row mt-3">
          {facilities.map((facility, index) => (
            <FacilityCard
              key={index}
              title={facility.title}
              date={facility.date}
              description={facility.description}
              onEdit={() => handleEdit(index)}
            />
          ))}
        </div>
        </div>

        {/* Modal for Creating or Editing Facility */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Facility" : "Create Facility"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="facilityName">
                <Form.Label>Facility Name<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Name"
                  value={facilityData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="facilityDescription" className="mt-3">
                <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter Description"
                  value={facilityData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="facilityDate" className="mt-3">
                <Form.Label>Schedule Service Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={facilityData.date}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="reminderBefore" className="mt-3">
                <Form.Label>Reminder Before (in days)</Form.Label>
                <Form.Control
                  type="number"
                  name="reminderBefore"
                  value={facilityData.reminderBefore}
                  onChange={handleInputChange}
                  min="1"
                />
                {validationError && (
                  <div className="text-danger mt-2">{validationError}</div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="mainColor2" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FacilityManagement;
