import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import Sidebar from '../component/Layout/Sidebar';
import Avtar from "../assets/Avatar.png"
import Header from './Navbar';

export default function ComplaintTracking() {
  const [complaints, setComplaints] = useState([
    { id: 1, name: "Evelyn Harper", type: "Unethical Behavior", description: "Providing false information or  ", unit: "A", number: "1001", priority: "Medium", status: "Pending" },
    { id: 2, name: "Esther Howard", type: "Preventive Measures", description: "Regular waste collection services  ", unit: "B", number: "1002", priority: "High", status: "Solve" },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // New state for the "Create Complaint" feature
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    name: "",
    type: "",
    description: "",
    unit: "",
    number: "",
    priority: "Medium",
    status: "Open",
  });


  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    if (!selectedComplaint.name || !selectedComplaint.type || !selectedComplaint.description || !selectedComplaint.unit || !selectedComplaint.number) {
      setErrorMessage("All fields are required.");
      return;
    }
    
    setComplaints((prevComplaints) =>
      prevComplaints.map((c) =>
        c.id === selectedComplaint.id ? selectedComplaint : c
      )
    );
  
    setShowModal(false);
    setErrorMessage("");
  };
  

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const getPriorityByStatus = (status) => {
    if (status === "Pending") return "Medium";
    if (status === "Open") return "Low";
    if (status === "Solve") return "High";
    return "Medium";
  };

  const badgeStyle = (priority) => {
    if (priority === "High") return { backgroundColor: "#E74C3C", color: "white" };
    if (priority === "Medium") return { backgroundColor: "#5678E9", color: "white" };
    if (priority === "Low") return { backgroundColor: "#39973D", color: "white" };
    return { backgroundColor: "#28a745", color: "white" };
  };

  const statusBadgeStyle = (status) => {
    if (status === "Pending") return { backgroundColor: " #FFC3131A", color: "#FFC313" };
    if (status === "Open") return { backgroundColor: "#5678E91A", color: "#5678E9" };
    if (status === "Solve") return { backgroundColor: "#39973D1A", color: "#39973D" };
    return { backgroundColor: "#f8f9fa", color: "black" };
  };

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);



  const handleCreateComplaint = () => {
    // Basic form validation
    if (!newComplaint.name || !newComplaint.type || !newComplaint.description || !newComplaint.unit || !newComplaint.number) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Validate and set priority based on status
    
    setErrorMessage(""); // Clear previous error message if any

    const newId = complaints.length + 1;  // Auto-generate a new ID
    const complaintToAdd = { ...newComplaint, id: newId };
    setComplaints([...complaints, complaintToAdd]);

    setNewComplaint({ name: "", type: "", description: "", unit: "", number: "", priority: "Medium", status: "Open" });
    setShowCreateModal(false);
  };

  // Trigger this effect whenever priority changes

  

  const imageColumnStyle = {
    display: "flex",
    alignItems: "center", // Aligns the image and text horizontally
    justifyContent: "flex-start", // Ensures the content starts from the left
    gap: "10px", // Space between the image and the name
  };
  const tableColumnStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    maxWidth: "350px",
  };

  const handleDelete = (id) => {
    setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint.id !== id));
  };


  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" style={{ width: "280px" }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg " style={{ width:"1620px"}}>
        <Header/>
        <div className="container-fluid  p-4" style={{ marginTop: "10px" }}>
         

          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Complaint Tracking</h4>
            <Button className="btn mainColor2 d-flex align-items-center justify-content-center" onClick={handleShowCreateModal}><FaPlus
    style={{
      fontSize: "18px",
      borderRadius: "5px",
      background: "rgba(255, 255, 255, 1)",
      color: "#FE512E",
      marginRight: "8px",
    }}
  />Create Complaint</Button>
          </div>
            <Table striped hover responsive className="mt-3" style={{ width: "1530px" }}>
              <thead className="bg-light">
                <tr className="rmHead">
                  <th className="text-start" style={{ padding: "10px",background:"rgb(185, 198, 242)" }}>Complainer Name</th>
                  <th className="text-start" style={{ padding: "10px",background:"rgb(185, 198, 242)" }}>Complaint Name</th>
                  <th className="text-center" style={{ padding: "10px",background:"rgb(185, 198, 242)" }}>Description</th>
                  <th className="text-center" style={{ padding: "10px",background:"rgb(185, 198, 242)" }}>Unit Number</th>
                  <th className="text-center" style={{ padding: "10px",background:"rgb(185, 198, 242)" }}>Priority</th>
                  <th className="text-center" style={{ padding: "10px",background:"rgb(185, 198, 242)" }}>Status</th>
                  <th className="text-center" style={{ padding: "10px",background:"rgb(185, 198, 242)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td style={tableColumnStyle}>
                      <div style={imageColumnStyle} className="text-center">
                        <img
                          src={Avtar}
                          alt="avatar"
                          className="rounded-circle"
                          style={{
                            width: "40px", // Fixed width
                            height: "40px", // Fixed height
                            borderRadius: "36px", // Radius for rounding the image
                            border: "2px solid #F4F4F4", // Border with the desired color
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "Poppins", // Apply Poppins font-family
                            fontSize: "16px", // Set font size to 16px
                            fontWeight: "500", // Set font weight to 500 (Medium)
                            lineHeight: "24px", // Set line height to 24px
                            textAlign: "left", // Align text to the left
                          }}
                        >
                          {complaint.name}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }} className="text-start">
                      {complaint.type}
                    </td>
                    <td style={{
                      ...tableColumnStyle,               // Presuming tableColumnStyle is a predefined style object
                      width: "250px",                    // Set the width of the element
                      height: "24px",                    // Set the height of the element
                      top: "21px",                       // Set the top positioning (ensure relative/absolute context)
                      left: "465px",                     // Set the left positioning (ensure relative/absolute context)
                      // Make the element fully transparent
                      fontFamily: "Poppins",             // Apply the Poppins font family
                      fontSize: "16px",                  // Set font size
                      fontWeight: "500",                 // Set font weight
                      lineHeight: "24px",                // Set line height
                      textAlign: "left",                 // Align text to the left
                      // Set background color
                      // Needed for positioning with top/left
                    }}>
                      {complaint.description}
                    </td>

                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                        {complaint.unit}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
                        {complaint.number}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span className="badge" style={{ ...badgeStyle(complaint.priority), width: "100px", height: "31px", padding: "5px 12px", gap: "8px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ ...statusBadgeStyle(complaint.status), width: "113px", height: "31px", padding: "5px 12px", gap: "5px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        {complaint.status}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaEdit className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(complaint)} />
                        <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleView(complaint)} />
                        <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(complaint.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Create Complaint Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <Form>
            <Form.Group className='mt-2'>
              <Form.Label>Complainer Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.name}
                onChange={(e) => setNewComplaint({ ...newComplaint, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Complaint Type<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.type}
                onChange={(e) => setNewComplaint({ ...newComplaint, type: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Description<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.description}
                onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
              />
              <Form >
                <div className='d-flex justify-content-between'>

               
                <Form.Group className='mt-2'>
                  <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={newComplaint.unit}
                    onChange={(e) => setNewComplaint({ ...newComplaint, unit: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className='mt-2'>
                  <Form.Label>Number<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={newComplaint.number}
                    onChange={(e) => setNewComplaint({ ...newComplaint, number: e.target.value })}
                  />
                </Form.Group>
                </div> 
              </Form>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label >Priority<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around ">
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }} >

                  <Form.Check
                    type="radio"
                    label="High"
                    name="priority"
                    value="High"
                    checked={newComplaint.priority === "High"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Medium"
                    name="priority"
                    value="Medium"
                    checked={newComplaint.priority === "Medium"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                  <Form.Check
                    type="radio"
                    label="Low"
                    name="priority"
                    value="Low"
                    checked={newComplaint.priority === "Low"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value })}
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group className='mt-2'>
              <Form.Label>Status<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around">
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Open"
                    name="status"
                    value="Open"
                    checked={newComplaint.status === "Open"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, status: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>


                  <Form.Check
                    type="radio"
                    label="Pending"
                    name="status"
                    value="Pending"
                    checked={newComplaint.status === "Pending"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, status: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Solve"
                    name="status"
                    value="Solve"
                    checked={newComplaint.status === "Solve"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, status: e.target.value })}
                  />
                </div>
              </div>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="secondary" onClick={handleCloseCreateModal} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
            Cancel
          </Button>
          <Button className='mainColor2' onClick={handleCreateComplaint} style={{
            width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

          }}>
            Create
          </Button>

        </Modal.Footer>
      </Modal>


      <Modal
        show={showViewModal}
        onHide={handleCloseViewModal}
        style={{
          width: "410px",
          left: "755px",
          padding: "20px 0px 0px 0px",
          borderRadius: "15px 0px 0px 0px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              width: "371px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            View Complaint
          </Modal.Title>

        </Modal.Header>
        <Modal.Body
          style={{
            width: "371px",
            height: "316px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {selectedComplaint && (
            <div>
              <div style={{
                width: "285px",
                height: "70px",
                display: "flex",

                gap: "15px",
                fontFamily: "Poppins, sans-serif",
              }}>
                <img
                  src={Avtar}
                  alt="avatar"
                  // className="rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%", // Ensures a perfect circle
                    border: "3px solid #F4F4F4",
                  }}
                />
                <div
                  style={{

                    height: "70px",
                    gap: "0px",
                    marginTop: "10px"
                  }}
                >
                  <h5 style={{ margin: 0 }}>{selectedComplaint.name}</h5>
                  <span style={{
                    color: "#A7A7A7",
                  }}>Aug 5, 2024</span>
                </div>

              </div>


              <div style={{

                height: "51px",
                gap: "3px",
                marginTop: "15px",
              }}>
                <strong style={{
                  color: "#A7A7A7",
                  fontWeight:"200"
                }}>Request Name</strong> <br />
                <span>{selectedComplaint.type}</span>
              </div>
              <div style={{

                height: "75px",
                gap: "3px",
                marginTop: "15px",

              }}>
                <strong style={{
                  color: "#A7A7A7",
                  fontWeight:"200"
                }}>Description</strong>
                <p style={{ margin: 0 }}>{selectedComplaint.description}</p>
              </div>

              <div
                className="d-flex"
                style={{
                  width: "370.25px",
                  gap: "10px",



                  justifyContent: "space-around"
                }}
              >
                <div style={{
                  width: "41px",
                  height: "55px",
                  top: "166px",
                  gap: "3px",

                  // Ensures the "top" property works as expected
                }}>
                  <strong
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "24px",

                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                      color: "#A7A7A7"
                    }}
                  >
                    Wing
                  </strong>

                  <p style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                    {selectedComplaint.unit}
                  </p>

                </div>

                <div
                  style={{
                    width: "35px",
                    height: "51px",
                    top: "168px",
                    left: "89.25px",
                    gap: "3px",
                    textAlign: "center"
                    // Make sure the "top" and "left" properties work
                  }}
                >
                  <strong style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",

                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "#A7A7A7"
                  }}>Unit</strong>
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "24px",

                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                      color: "#202224",
                      width: "35px",
                      height: "24px",
                      margin: "0"  // Set margin to 0 (instead of gap) as gap works only in flex/grid containers
                    }}
                  >
                    {selectedComplaint.number}
                  </p>

                </div>

                <div
                  style={{
                    width: "86px",
                    height: "55px",
                    top: "166px",
                    left: "172.25px",
                    gap: "3px",
                    textAlign: "center",


                  }}
                >
                  <strong style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",

                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "#A7A7A7",

                  }}>Priority</strong>
                  <p
                    style={{
                      textAlign: "center",
                      borderRadius: "50px",
                      background: badgeStyle(selectedComplaint.priority).backgroundColor,
                      color: "white"
                    }}
                  >
                    {selectedComplaint.priority}
                  </p>


                </div>

                <div style={{

                  gap: "3px",
                  textAlign: "center",


                }} >
                  <strong style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",

                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "#A7A7A7"
                  }}>Status</strong>
                  <p
                    style={{
                      textAlign: "center",
                      padding: "2px 10px",
                      borderRadius: "50px",
                      backgroundColor: statusBadgeStyle(selectedComplaint.status).backgroundColor,
                      color: statusBadgeStyle(selectedComplaint.status).color
                    }}
                  >
                    {selectedComplaint.status}
                  </p>

                </div>
              </div>

            </div>

          )}
        </Modal.Body>

      </Modal>


      {/* edit model */}

      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Complaint</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {errorMessage && (
      <div className="alert alert-danger">{errorMessage}</div>
    )}
    <Form>
      <Form.Group className='mt-2'>
        <Form.Label>Complainer Name<span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          value={selectedComplaint?.name || ""}
          onChange={(e) =>
            setSelectedComplaint((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      </Form.Group>
      <Form.Group className='mt-3'>
        <Form.Label>Complaint Type<span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          value={selectedComplaint?.type || ""}
          onChange={(e) =>
            setSelectedComplaint((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
        />
      </Form.Group>
      <Form.Group className='mt-3'>
        <Form.Label>Description<span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          value={selectedComplaint?.description || ""}
          onChange={(e) =>
            setSelectedComplaint((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </Form.Group >
      <div className='d-flex justify-content-between'>

     
      <Form.Group className='mt-3'>
  <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
  <Form.Control
    type="text"
    value={selectedComplaint?.unit || ""}
    onChange={(e) =>
      setSelectedComplaint((prev) => ({
        ...prev,
        unit: e.target.value,
      }))
    }
  />
</Form.Group>

<Form.Group className='mt-3'>
  <Form.Label>Number<span className="text-danger">*</span></Form.Label>
  <Form.Control
    type="text"
    value={selectedComplaint?.number || ""}
    onChange={(e) =>
      setSelectedComplaint((prev) => ({
        ...prev,
        number: e.target.value,
      }))
    }
  />
</Form.Group>
</div>
      <Form.Group className='mt-3'>
        <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
        <div className="d-flex justify-content-around  " >

          {["High", "Medium", "Low"].map((priority) => (
            <Form.Check
            style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingRight: "30px", borderRadius: "5px",paddingTop:"8px",paddingBottom: "8px" }}
              type="radio"
              label={priority}
              name="priority"
              value={priority}
              checked={selectedComplaint?.priority === priority}
              onChange={(e) =>
                setSelectedComplaint((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }))
              }
              key={priority}
            />
           
          ))}
          
        </div>
      </Form.Group>
      <Form.Group className='mt-3'>
        <Form.Label>Status<span className="text-danger">*</span></Form.Label>
        <div className="d-flex justify-content-around">
          {["Open", "Pending", "Solve"].map((status) => (
            <Form.Check
             style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingRight: "30px",paddingTop:"8px",paddingBottom: "8px", borderRadius: "5px" }}
              type="radio"
              label={status}
              name="status"
              value={status}
              checked={selectedComplaint?.status === status}
              onChange={(e) =>
                setSelectedComplaint((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              key={status}
            />
          ))}
        </div>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
    <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} variant="secondary" onClick={handleCloseModal}>
      Cancel
    </Button>
    <Button style={{
            width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

          }} className='mainColor2' onClick={handleSave}>
      Save 
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}
