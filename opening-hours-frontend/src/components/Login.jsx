// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigateTo = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:8080/login", {
				username,
				password,
			});
			localStorage.setItem("token", response.data.token);
			navigateTo("/");
		} catch (error) {
			console.error("Error logging in:", error);
			alert("Invalid credentials. Please try again.");
		}
	};

	return (
		<div className="max-w-sm mx-auto">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block mb-1">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="border px-3 py-2 w-full"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-1">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border px-3 py-2 w-full"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
