import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { LuImagePlus } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import Header from './Navbar';

export default function ResidentForm() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState('owner');
  const [photo, setPhoto] = useState(null);
const [photoPreview, setPhotoPreview] = useState('');
const [formData, setFormData] = useState({
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  age: '',
  gender: '',
  wing: '',
  unit: '',
  relation: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  aadharFront: null,
  aadharBack: null,
  addressProof: null,
  rentAgreement: null,
  aadharFrontPreview: '',
  aadharBackPreview: '',
  addressProofPreview: '',
  rentAgreementPreview: '',
  memberCount: 0,
  members: [], // Initialize members as an empty array
  vehicleCount: 0,
  vehicles: [], // Initialize vehicles as an empty array
  uploadErrors: {
    aadharFront: '',
    aadharBack: '',
    addressProof: '',
    rentAgreement: '',
  },
});



  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image (PNG or JPEG).");
    }
  };
  
const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleMemberCountChange = (e) => {
  const count = Number(e.target.value);
  setFormData({
    ...formData,
    memberCount: count,
    members: count > 0 ? Array.from({ length: count }, (_, i) => formData.members[i] || {}) : [],
  });
};

const handleVehicleCountChange = (e) => {
  const count = Number(e.target.value);
  setFormData({
    ...formData,
    vehicleCount: count,
    vehicles: count > 0 ? Array.from({ length: count }, (_, i) => formData.vehicles[i] || {}) : [],
  });
};

const handleMemberChange = (index, e) => {
  const { name, value } = e.target;
  const updatedMembers = [...formData.members];
  updatedMembers[index] = { ...updatedMembers[index], [name]: value };
  setFormData({ ...formData, members: updatedMembers });
};

const handleVehicleChange = (index, e) => {
  const { name, value } = e.target;
  const updatedVehicles = [...formData.vehicles];
  updatedVehicles[index] = { ...updatedVehicles[index], [name]: value };
  setFormData({ ...formData, vehicles: updatedVehicles });
};

const toggleMemberDropdown = () => {
  if (memberDropdownOpen) {
    // When the dropdown is toggled off, reset to default 0
    setFormData({
      ...formData,
      memberCount: 0,
      members: [],
    });
  }
  setMemberDropdownOpen(!memberDropdownOpen);
};

// Toggle vehicle dropdown
const toggleVehicleDropdown = () => {
  if (vehicleDropdownOpen) {
    // When the dropdown is toggled off, reset to default 0
    setFormData({
      ...formData,
      vehicleCount: 0,
      vehicles: [],
    });
  }
  setVehicleDropdownOpen(!vehicleDropdownOpen);
};

const handleFileChange = (e, fileType) => {
  const file = e.target.files[0];
  if (file) {
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      setFormData((prevState) => ({
        ...prevState,
        uploadErrors: {
          ...prevState.uploadErrors,
          [fileType]: "Invalid file type. Only PNG, JPG, and PDF are allowed.",
        },
      }));
      return;
    }

    // Check file size
    if (file.size > maxSize) {
      setFormData((prevState) => ({
        ...prevState,
        uploadErrors: {
          ...prevState.uploadErrors,
          [fileType]: "File size exceeds 10 MB.",
        },
      }));
      return;
    }

    // Create preview URL for images
    const previewURL = file.type.startsWith("image/") ? URL.createObjectURL(file) : '';

    // Update state with file data and preview
    setFormData((prevState) => ({
      ...prevState,
      [fileType]: file,
      [`${fileType}Preview`]: previewURL,
      uploadErrors: {
        ...prevState.uploadErrors,
        [fileType]: "", // Reset error message if file is valid
      },
    }));
  }
};




const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData);

  // Reset form data
  setFormData({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    age: '',
    gender: '',
    wing: '',
    unit: '',
    relation: '',
    occupation: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    aadharFront: null,
    aadharBack: null,
    addressProof: null,
    rentAgreement: null,
    aadharFrontPreview: '',
    aadharBackPreview: '',
    addressProofPreview: '',
    rentAgreementPreview: '',
    uploadErrors: {},
  });

  navigate('/home/residentmanagement');
};

  return (
    <div className='dashboard-bg'>
    
   <div  style={{marginLeft:"280px" , width:"1600px"}}>
   <Header/>
   </div>
       
    <div className="container  p-5" style={{ maxWidth: '1540px', marginLeft: '310px', marginTop: '50px' }}>
      <div className="mb-4">
        <button
          className={`btn ${formType === 'owner' ? 'mainColor2' : 'btn'} me-2`}
          onClick={() => setFormType('owner')}
        >
          Owner
        </button>
        <button
          className={`btn ${formType === 'tenant' ? 'mainColor2' : 'btn'}`}
          onClick={() => setFormType('tenant')}
        >
          Tenant
        </button>
      </div>

      <form onSubmit={handleSubmit}>



         {/* Tenant-Specific Owner Fields */}
         {formType === 'tenant' && (
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Owner Name*</label>
              <input type="text" name="ownerName" className="form-control" value={formData.ownerName} onChange={handleInputChange} required />
            </div>
            <div className="col-md-4">
              <label>Owner Phone Number*</label>
              <input type="text" name="ownerPhoneNumber" className="form-control" value={formData.ownerPhoneNumber} onChange={handleInputChange} required />
            </div>
            <div className="col-md-4">
            <label>Owner Email Address</label>
            <input type="email" name="emailAddress" className="form-control" value={formData.emailAddress} onChange={handleInputChange} />
          </div>
          </div>
        )}
        {/* Basic Info Fields */}
        <div className="d-flex flex-wrap mb-3">
  {/* Photo Upload Section */}
  {/* Profile Photo Section */}
  <div className="col-md-2 d-flex mb-3">
  <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(211, 211, 211, 1)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #ddd",
        }}
      >
        {photoPreview ? (
          <img
            src={photoPreview}
            alt="Uploaded Photo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <FaCamera style={{ color: "rgba(255, 255, 255, 1)", fontSize: "16px" }} />
        )}
      </div>
      <div className='text-center p-2' style={{ color: "#007bff" }}>Add Photo</div>
    </div>
  </label>
  <input
    id="photo-upload"
    type="file"
    accept="image/png, image/jpeg"
    style={{ display: 'none' }}
    onChange={handlePhotoUpload}
  />
</div>


  {/* Form Fields */}
  <div className="col-md-10"  >
    <div className="row mb-3">
      <div className="col-md-4">
        <label>Full Name<span className="text-danger">*</span></label>
        <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleInputChange} required />
      </div>
      <div className="col-md-4">
        <label>Phone Number<span className="text-danger">*</span></label>
        <input type="text" name="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleInputChange} required />
      </div>
      <div className="col-md-4">
        <label>Email Address</label>
        <input type="email" name="emailAddress" className="form-control" value={formData.emailAddress} onChange={handleInputChange} />
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-2">
        <label>Age<span className="text-danger">*</span></label>
        <input type="number" name="age" className="form-control" value={formData.age} onChange={handleInputChange} required />
      </div>
      <div className="col-md-2">
        <label>Gender<span className="text-danger">*</span></label>
        <select name="gender" className="form-control" value={formData.gender} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="col-md-2">
        <label>Wing<span className="text-danger">*</span></label>
        <input type="text" name="wing" className="form-control" value={formData.wing} onChange={handleInputChange} required />
      </div>
      <div className="col-md-3">
        <label>Unit<span className="text-danger">*</span></label>
        <input type="text" name="unit" className="form-control" value={formData.unit} onChange={handleInputChange} required />
      </div>
      <div className="col-md-3">
        <label>Relation<span className="text-danger">*</span></label>
        <input type="text" name="relation" className="form-control" value={formData.relation} onChange={handleInputChange} required />
      </div>
    </div>
  </div>
</div>

       

<div className="row mb-3">
  {['aadharFront', 'aadharBack', 'addressProof', 'rentAgreement'].map((fileType, index) => (
    <div className="col-md-3" key={index}>
      <label>
        {fileType === 'aadharFront' && 'Upload Aadhar Card (Front Side)'}
        {fileType === 'aadharBack' && 'Upload Aadhar Card (Back Side)'}
        {fileType === 'addressProof' && 'Address Proof (Vera Bill / Light Bill)'}
        {fileType === 'rentAgreement' && 'Rent Agreement'}
      </label>
      <div
        className="text-center"
        style={{
          border: "2px dashed rgba(211, 211, 211, 1)",
          borderRadius: "8px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        <label htmlFor={`${fileType}-upload`} style={{ cursor: 'pointer', color: '#007bff' }}>
          <LuImagePlus
            className="text-center"
            style={{
              fontSize: '24px',
              marginBottom: '8px',
              width: '40px',
              height: '50px',
              color: "rgba(167, 167, 167, 1)",
            }}
          />
          <div>Upload a file <span style={{ color: "black" }}>or drag and drop</span></div>
        </label>
        <small className="text-muted">PNG, JPG, GIF, PDF up to 10MB</small>
        <input
          id={`${fileType}-upload`}
          type="file"
          accept="image/png, image/jpeg, application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFileChange(e, fileType)}
        />

        {/* Display file preview or error */}
        {formData.uploadErrors[fileType] && (
          <small style={{ color: "red" }}>{formData.uploadErrors[fileType]}</small>
        )}
        {formData[`${fileType}Preview`] && (
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <img
              src={formData[`${fileType}Preview`]}
              alt={`${fileType} Preview`}
              style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </div>
  ))}
</div>


       
        
      </form>

      
    </div>


 <div className="container p-4" style={{ maxWidth: '1540px', marginLeft: '310px', marginTop: '20px' }}>
 <form>
        {/* Member Count Dropdown Toggle */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
              Member Counting:
              <span style={{ color: '#aaa', marginLeft: '8px' }}>(Other Members)</span>
            </label>
          </div>
          <div className="col-md-6 text-end">
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333', marginRight: '10px' }}>
                Select Member
              </label>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '4px',
                  cursor: 'pointer',
                }}
                onClick={toggleMemberDropdown}
              >
                <select
                  name="memberCount"
                  className="form-control"
                  style={{
                    width: '60px',
                    border: 'none',
                    appearance: 'none',
                    background: 'none',
                    fontSize: '14px',
                    color: '#333',
                    outline: 'none',
                  }}
                  value={formData.memberCount}
                  onChange={handleMemberCountChange}
                  onClick={(e) => e.stopPropagation()} // Prevent dropdown toggle when selecting an option
                >
                  {[...Array(7).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span style={{ fontSize: '16px', marginLeft: '5px' }}>
                {memberDropdownOpen ? '▲' : '▼'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Member Entry Fields - Conditional Rendering */}
        {memberDropdownOpen && formData.memberCount > 0 && formData.members.map((member, index) => (
        
          <div key={index} className="row mb-3">
            <div className="col-md-2">
              <label>Full Name<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                value={member.fullName || ''}
                onChange={(e) => handleMemberChange(index, 'fullName', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>Phone No<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="+91"
                value={member.phone || ''}
                onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email Address"
                value={member.email || ''}
                onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>Age<span className="text-danger">*</span></label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Age"
                value={member.age || ''}
                onChange={(e) => handleMemberChange(index, 'age', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>Gender<span className="text-danger">*</span></label>
              <select
                className="form-control"
                value={member.gender || ''}
                onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-2">
              <label>Relation<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Relation"
                value={member.relation || ''}
                onChange={(e) => handleMemberChange(index, 'relation', e.target.value)}
              />
            </div>
          </div>
        ))}
      </form>
</div>


<div className="container p-4" style={{ maxWidth: '1540px', marginLeft: '310px', marginTop: '20px' }}>
<form>
        {/* Vehicle Count Dropdown Toggle */}
        <div className="row mb-6 align-items-center">
          <div className="col-md-6">
            <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Vehicle Counting:</label>
          </div>
          <div className="col-md-6 text-end">
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333', marginRight: '10px' }}>Select Vehicle</label>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  marginBottom:"10px"
                }}
                onClick={toggleVehicleDropdown}
              >
                <select
                  name="vehicleCount"
                  className="form-control"
                  style={{
                    width: '60px',
                    border: 'none',
                    appearance: 'none',
                    background: 'none',
                    fontSize: '14px',
                    color: '#333',
                    outline: 'none',
                  }}
                  value={formData.vehicleCount}
                  onChange={handleVehicleCountChange}
                  onClick={(e) => e.stopPropagation()}// Prevent toggle on selection
                >
                  {[...Array(7).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span style={{ fontSize: '16px', marginLeft: '5px' }}>{vehicleDropdownOpen ? '▲' : '▼'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Input Fields - Conditional Rendering */}
       {vehicleDropdownOpen && formData.vehicleCount > 0 && (
  <div className="row">
    {formData.vehicles.map((vehicle, index) => (
      <div
        key={index}
        className="col-md-6 mb-4" // Adds bottom margin to each item
        style={{
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: '#fff',
        }}
      >
        <div className="row">
          <div className="col-md-4">
            <label style={{ fontWeight: 'bold' }}>Vehicle Type*</label>
            <select
              name="vehicleType"
              className="form-control"
              value={vehicle.vehicleType || ''}
              onChange={(e) => handleVehicleChange(index, e)}
              required
            >
              <option value="">Select Vehicle Type</option>
              <option value="Two Wheeler">Two Wheeler</option>
              <option value="Four Wheeler">Four Wheeler</option>
            </select>
          </div>
          <div className="col-md-4">
            <label style={{ fontWeight: 'bold' }}>Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              className="form-control"
              placeholder="Enter Name"
              value={vehicle.vehicleName || ''}
              onChange={(e) => handleVehicleChange(index, e)}
            />
          </div>
          <div className="col-md-4">
            <label style={{ fontWeight: 'bold' }}>Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              className="form-control"
              placeholder="Enter Number"
              value={vehicle.vehicleNumber || ''}
              onChange={(e) => handleVehicleChange(index, e)}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)}


      </form>
</div>

<div className="container-fluid " style={{ maxWidth: '1540px', marginLeft: '310px', marginTop: '20px' }}>
<form onSubmit={handleSubmit}>
  <div className="d-flex justify-content-end gap-2 mt-4">
    <button type="button" style={{ border: "1px solid #202224", padding: "10px ",borderRadius:"10px", background: "#FFFFFF", color: "#202224", }}  >Cancel</button>
    <button type="submit" className="mainColor2" style={{borderRadius:"10px",padding:"10px"}}>Create</button>
  </div>
</form>
</div>


    </div>
 
  );
}