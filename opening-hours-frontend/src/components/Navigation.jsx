import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<nav>
			<ul className="m-4 h-10 flex justify-evenly items-center bg-black text-white">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/add">Add</Link>
				</li>
				<li>
					<Link to="/logout">Logout</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
