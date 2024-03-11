// src/components/Logout.js

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
	const navigateTo = useNavigate();
 
	const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            };
            await axios.post("http://localhost:8080/logout", null, config);
            // Clear authentication token from local storage
            localStorage.removeItem("token");
            // Redirect user to the login page
            navigateTo("/login");
        } catch (error) {
            console.error("Error Logging out:", error);
			alert("Failed Logout.");
        }
	};

	return (
		<div className="flex justify-center">
			<button
				onClick={handleLogout}
				className="bg-red-500 text-white px-4 py-2 rounded"
			>
				Logout
			</button>
		</div>
	);
};

export default Logout;
