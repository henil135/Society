import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Button, Container } from 'react-bootstrap';
import { FaGreaterThan } from "react-icons/fa6";
import avtar from '../assets/Avatar.png';
import { FaBell } from "react-icons/fa";
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Header() {
    const [notifications, setNotifications] = useState([
        'New habit reminder',
        'Goal achieved!',
        'Don\'t forget to update your progress'
    ]);
    const [showNotifications, setShowNotifications] = useState(false);
    
    // Get the current location (path)
    const location = useLocation();

    // Function to extract the last part of the path for breadcrumb
    const getPageName = (path) => {
        const pathParts = path.split('/');
        return pathParts[pathParts.length - 1] || 'Home'; // Default to 'Home' if path is empty
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const clearNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    return (
        <>
            <div className='header' >
                <Navbar expand="sm" className="navbar bg-white  border-bottom p-4" >
                    <Container fluid>
                        {/* Breadcrumb */}
                        <h5 className='home-routing'>
                            Home <span className='home-routing-span ms-2'><FaGreaterThan /></span>
                            <span className="current-page-routing ms-2"> {getPageName(location.pathname)}</span> {/* Display current page */}
                        </h5>

                        {/* Toggle Button for Small Screens */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="d-flex align-items-center">
                                {/* Notification Icon */}
                                <Button
                                    variant="light"
                                    className="position-relative me-3 px-2 mt-2 text-black notification-icon"
                                    onClick={toggleNotifications}
                                >
                                    <FaBell />
                                    {notifications.length > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {notifications.length}
                                        </span>
                                    )}
                                </Button>

                                {/* Notification Dropdown */}
                                {showNotifications && (
                                    <div
                                        className="notification-dropdown position-absolute bg-white border shadow-sm p-2"
                                        style={{ right: '60px', top: '50px', width: '280px', zIndex: 1000 }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="mb-0">Notifications</h6>
                                            <Button variant="link" size="sm" onClick={clearNotifications} className="text-primary">
                                                Clear All
                                            </Button>
                                        </div>
                                        <ul className="list-unstyled">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification, index) => (
                                                    <li key={index} className="border-bottom py-2 text-muted">
                                                        {notification}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-muted">No new notifications</li>
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {/* User Profile as a Link */}
                                <Dropdown align="center" className="d-flex align-items-center profile">
                                    <Link to="/home/profile" className="d-flex align-items-center text-decoration-none">
                                        <img
                                            src={avtar}
                                            alt="User"
                                            className="rounded-circle me-2"
                                            width="35"
                                            height="35"
                                        />
                                        <div>
                                            <span className="navbar-span">Moni Roy</span>
                                            <br />
                                            <small className="text-muted">Admin</small>
                                        </div>
                                    </Link>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}
