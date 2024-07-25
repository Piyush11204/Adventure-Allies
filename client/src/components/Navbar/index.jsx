import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logoDevtalk from "../../img/logoDevtalk.png";
import axios from 'axios';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null); // Remove user from state
        window.location.reload();
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCurrentUser(response.data);
            } catch (error) {
                console.error("Error fetching current user:", error);
                // Handle token expiration or other errors
                setCurrentUser(null);
            }
        };

        // Fetch current user only if a token exists
        if (localStorage.getItem('token')) {
            fetchCurrentUser();
        } else {
            setCurrentUser(null);
        }
    }, []);

    return (
        <div className="main_container">
            <nav className="navbar">
                <img className="logo" src={logoDevtalk} alt="Logo" />
                <a href="/Home"><h1>Adventure Allies</h1></a>
                <div className="sub-topic">
                    <a href="/Home">Home</a>
                    <a href="/addLocation">Add location</a>
                    <a href="#contact">Contact</a>
                    {currentUser && (
						
						<h3 className="userName"> <h2 className="userlogo">{currentUser.firstName[0]}</h2>{currentUser.firstName} {currentUser.lastName}</h3>
                    )}
                </div>
					{currentUser ? (
                    <button className="btn-login" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className="btn-login">
                        <a href="/signup">Login</a>
                    </button>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
