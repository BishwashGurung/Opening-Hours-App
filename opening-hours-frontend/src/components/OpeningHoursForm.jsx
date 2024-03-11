// src/components/OpeningHoursForm.js

import React, { useState } from "react";
import axios from "axios";

const OpeningHoursForm = () => {
	const [dayOfWeek, setDayOfWeek] = useState("");
	const [openTime, setOpenTime] = useState("");
	const [closeTime, setCloseTime] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const config = {
				headers: {
					Authorization: `${token}`
				}
			};
			const formData = { dayOfWeek, openTime, closeTime };
			await axios.post("http://localhost:8080/opening-hours", formData, config);
			alert("Opening hours added successfully!");
			setDayOfWeek("");
			setOpenTime("");
			setCloseTime("");
		} catch (error) {
			console.error("Error adding opening hours:", error);
			alert("Failed to add opening hours.");
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
			<h2 className="text-2xl font-bold mb-4">Add New Opening Hours</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="dayOfWeek" className="block mb-1">
						Day of Week
					</label>
					<input
						type="number"
						id="dayOfWeek"
						value={dayOfWeek}
						onChange={(e) => setDayOfWeek(e.target.value)}
						className="border px-3 py-2 w-full"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="openTime" className="block mb-1">
						Open Time
					</label>
					<input
						type="text"
						id="openTime"
						value={openTime}
						onChange={(e) => setOpenTime(e.target.value)}
						className="border px-3 py-2 w-full"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="closeTime" className="block mb-1">
						Close Time
					</label>
					<input
						type="text"
						id="closeTime"
						value={closeTime}
						onChange={(e) => setCloseTime(e.target.value)}
						className="border px-3 py-2 w-full"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Add Opening Hours
				</button>
			</form>
		</div>
	);
};

export default OpeningHoursForm;
