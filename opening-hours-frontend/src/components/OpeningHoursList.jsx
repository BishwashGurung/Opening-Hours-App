// src/components/OpeningHoursList.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const OpeningHoursList = () => {
	const [openingHours, setOpeningHours] = useState([]);

	useEffect(() => {
		const fetchOpeningHours = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/opening-hours/current-week"
				);
				setOpeningHours(response.data);
			} catch (error) {
				console.error("Error fetching opening hours:", error);
			}
		};

		fetchOpeningHours();
	}, []);

	const getDayOfWeekString = (dayOfWeek) => {
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return daysOfWeek[dayOfWeek];
	};

	return (
		<div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
			<h2 className="text-2xl font-bold mb-4">
				Opening Hours for Current Week
			</h2>
			<ul>
				{openingHours.map((openingHour, index) => (
					<li key={index} className="mb-2">
						<span className="font-semibold">Day of Week:</span>{" "}
						{getDayOfWeekString(openingHour.dayOfWeek)}, &nbsp;
						<span className="font-semibold">Open Time:</span>{" "}
						{openingHour.openTime}, &nbsp;
						<span className="font-semibold">Close Time:</span>{" "}
						{openingHour.closeTime}
					</li>
				))}
			</ul>
		</div>
	);
};

export default OpeningHoursList;
