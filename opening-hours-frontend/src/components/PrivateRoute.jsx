// PrivateRoute.js

import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	// State to track if the alert has been shown
	const [alertShown, setAlertShown] = useState(false);

	// Check if user is authenticated
	const isAuthenticated = localStorage.getItem("token");

	useEffect(() => {
		// If user is not authenticated and alert has not been shown, show the alert
		if (!isAuthenticated && !alertShown) {
			alert("Please Login First");
			setAlertShown(true);
		}
	}, [isAuthenticated, alertShown]);

	if (!isAuthenticated) {
		// If user is not authenticated, redirect to login page
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};

export default PrivateRoute;
