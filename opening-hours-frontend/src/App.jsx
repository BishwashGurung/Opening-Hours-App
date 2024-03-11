// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import OpeningHoursForm from "./components/OpeningHoursForm";
import OpeningHoursList from "./components/OpeningHoursList";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";

const App = () => {
	return (
		<Router>
			<Navigation />
			<div className="container mx-auto py-8">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Opening Hours Management
				</h1>
				<Routes>
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/" element={<OpeningHoursList />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/add" element={ <PrivateRoute /> }>
						<Route exact path="/add" element={ <OpeningHoursForm /> } />
					</Route>
					<Route exact path="/logout" element={ <PrivateRoute /> }>
						<Route exact path="/logout" element={ <Logout /> } />
					</Route>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
