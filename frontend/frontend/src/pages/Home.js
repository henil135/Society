import React from "react";
import { Route, Routes} from "react-router-dom";
import ResidentManagement from "../component/Residentmanagement";
import Sidebar from "../component/Layout/Sidebar"; 
import ResidentForm from "../component/ResidentForm";
import FacilityManagement from "../component/FacilityManagement";
import CreateComplaint from "../component/CreateComplaint";
import RequestTracking from "../component/RequestTracking";
import VisitorsLogs from "../component/VisitorsLogs";
import SecurityProtocols from "../component/SecurityProtocols";
import SecurityGuard from "../component/SecurityGuard";
import Dashboard from "../component/Dashboard";
import FinancialManagementIncome from "../component/FinancialManagementIncome";
import FinancialManagementExp from "../component/FinancialManagementExp";
import FinancialManagementNote from "../component/FinancialManagementNote";
import Profile from "../component/Profile";
import EditProfile from "../component/EditProfile";
import FinancialManagementOtherIncome from "../component/FinancialManagementOtherIncome";
import Announcement from "../component/Announcement";


const Home = () => {
  return <div>
    <Sidebar/>
    
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
      
      <Route path="/residentmanagement" element={<ResidentManagement/>}/>
      <Route path="/residentForm" element={<ResidentForm/>}/>
      <Route path="/facility-management" element={<FacilityManagement/>}/>
      <Route path="/create-complaint" element={<CreateComplaint/>}/>
      <Route path="/request-tracking" element={<RequestTracking/>}/>
      <Route path="/visitors-log" element={<VisitorsLogs/>}/>
      <Route path="/security-protocols" element={<SecurityProtocols/>}/>
      <Route path="/security-guard" element={<SecurityGuard/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route path="/Financial-Maintenanace" element={<FinancialManagementIncome />} />
                <Route path="/Other-Income" element={<FinancialManagementOtherIncome />} />
                <Route path="/Expense" element={<FinancialManagementExp />} />
                <Route path="/Note" element={<FinancialManagementNote />} />
                <Route path="/announcement" element={<Announcement/>} />

    </Routes>
  </div>;
};

export default Home;





