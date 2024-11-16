import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword'; // Create this component
import 'bootstrap/dist/css/bootstrap.min.css';
import EnterOtp from './component/EnterOtp';
import ResetPassword from './component/ResetPassword';
import Home from './pages/Home';
import Signup from './component/Signup.js'
function App() {
  return (
    <div className="d-flex">
      <BrowserRouter>
        <Routes>
        <Route element={<Signup />} path='/' />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
