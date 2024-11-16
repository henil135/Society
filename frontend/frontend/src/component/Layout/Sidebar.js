import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaTh,
  FaBullhorn,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { PiBuildingOfficeBold, PiMoneyWavyFill } from "react-icons/pi";
import { AiFillDollarCircle } from "react-icons/ai";
import { TbMessage2Cancel } from "react-icons/tb";
import { BsShieldLockFill } from "react-icons/bs";
import { RiShieldUserFill } from "react-icons/ri";

export default function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isComplaintDropdownOpen, setComplaintDropdownOpen] = useState(false);
  const [isSecurityDropdownOpen, setSecurityDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard";
    setActiveItem(path);

    if (path === "create-complaint" || path === "request-tracking") {
      setComplaintDropdownOpen(true);
      setSecurityDropdownOpen(false);
    } else if (path === "visitors-log" || path === "security-protocols") {
      setSecurityDropdownOpen(true);
      setComplaintDropdownOpen(false);
    } else {
      setComplaintDropdownOpen(false);
      setSecurityDropdownOpen(false);
    }
  }, [location]);

  const handleComplaintClick = () => {
    setComplaintDropdownOpen(!isComplaintDropdownOpen);
    setSecurityDropdownOpen(false);
    setFinancialDropdownOpen(false);
    setActiveItem("complaint-tracking");
  };

  const handleSecurityClick = () => {
    setSecurityDropdownOpen(!isSecurityDropdownOpen);
    setComplaintDropdownOpen(false);
    setFinancialDropdownOpen(false);
    setActiveItem("security-management");
  };

  const handleFinancialClick = () => {
    setFinancialDropdownOpen(!isFinancialDropdownOpen);
    setComplaintDropdownOpen(false);
    setSecurityDropdownOpen(false);
    setActiveItem("financialmanagement");
  };

  const handleMainItemClick = (key) => {
    setActiveItem(key);
    setComplaintDropdownOpen(false);
    setSecurityDropdownOpen(false);
    setFinancialDropdownOpen(false);
  };

  const handleSubItemClick = (key) => {
    setActiveItem(key);
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FaTh />, path: "/home/dashboard" },
    { key: "residentmanagement", label: "Resident Management", icon: <PiMoneyWavyFill />, path: "/home/residentmanagement" },
    {
      key: "financialmanagement",
      label: "Financial Management",
      icon: <AiFillDollarCircle />,
      subItems: [
        { key: "income", label: "Income", path: "/home/Financial-Maintenanace" },
        { key: "expenses", label: "Expenses", path: "/home/expense" },
        { key: "note", label: "Note", path: "/home/note" },
      ],
    },
    { key: "facility-management", label: "Facility Management", icon:<PiBuildingOfficeBold />, path: "/home/facility-management" },
    {
      key: "complaint-tracking",
      label: "Complaint Tracking",
      icon: <TbMessage2Cancel/>,
      subItems: [
        { key: "create-complaint", label: "Create Complaint", path: "/home/create-complaint" },
        { key: "request-tracking", label: "Request Tracking", path: "/home/request-tracking" },
      ],
    },
    {
      key: "security-management",
      label: "Security Management",
      icon: <BsShieldLockFill />,
      subItems: [
        { key: "visitors-log", label: "Visitors Log", path: "/home/visitors-log" },
        { key: "security-protocols", label: "Security Protocols", path: "/home/security-protocols" },
      ],
    },
    { key: "security-guard", label: "Security Guard", icon: <RiShieldUserFill />, path: "/home/security-guard" },
    { key: "announcement", label: "Announcement", icon: <FaBullhorn />, path: "/home/announcement" },
  ];

  return (
    <div className="sidebar">
      <div
        className="offcanvas offcanvas-start show"
        tabIndex="-1"
        style={{ visibility: "visible", width: "280px" }}
        aria-labelledby="offcanvasExampleLabel"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header justify-content-center">
          <h1 className="offcanvas-title mainColor mx-5" id="offcanvasExampleLabel">
            Dash<span className="text-dark">Stack</span>
          </h1>
        </div>
        <hr />

        <div className="offcanvas-body p-0">
          <ul className="list-unstyled">
            {menuItems.map((item) =>
              item.subItems ? (
                <li key={item.key} className="p-3 rounded">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      cursor: "pointer",
                      color: "black",
                    }}
                    onClick={() => {
                      if (item.key === "complaint-tracking") {
                        handleComplaintClick();
                      } else if (item.key === "security-management") {
                        handleSecurityClick();
                      } else if (item.key === "financialmanagement") {
                        handleFinancialClick();
                      }
                    }}
                  >
                    <div className="d-flex align-items-center">
                      {item.icon}
                      <span className="ms-3">{item.label}</span>
                    </div>
                    {item.key === "complaint-tracking" && (isComplaintDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                    {item.key === "security-management" && (isSecurityDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                    {item.key === "financialmanagement" && (isFinancialDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  </div>
                  {(item.key === "complaint-tracking" && isComplaintDropdownOpen) ||
                  (item.key === "security-management" && isSecurityDropdownOpen) ||
                  (item.key === "financialmanagement" && isFinancialDropdownOpen) ? (
                    <ul className="list-unstyled ms-4">
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem.key}
                          className={`p-2 rounded ${activeItem === subItem.key ? "mainColor2 text-white" : ""}`}
                          onClick={() => handleSubItemClick(subItem.key)}
                        >
                          <Link
                            to={subItem.path}
                            className="d-flex align-items-center"
                            style={{
                              textDecoration: "none",
                              color: activeItem === subItem.key ? "white" : "black",
                            }}
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.key} className={`p-3 rounded ${activeItem === item.key ? "mainColor2" : ""}`}>
                  <Link
                    to={item.path}
                    className="d-flex align-items-center"
                    style={{ textDecoration: "none", color: activeItem === item.key ? "white" : "black" }}
                    onClick={() => handleMainItemClick(item.key)}
                  >
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <hr />

        <div className="p-3">
          <Link to="/" className="d-flex align-items-center text-danger" style={{ textDecoration: "none" }}>
            <FaSignOutAlt className="me-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
