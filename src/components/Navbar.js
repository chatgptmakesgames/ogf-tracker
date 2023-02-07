import React from "react";
import { useState, useEffect } from "react";
// import ReactDOM from 'react-dom/client'

// const root = ReactDOM.createRoot(
//     document.getElementById('root')
//   );

export default function Navbar() {
	const [time, setTime] = useState();

	useEffect(() => {
		setInterval(() => {
			setTime(() => new Date().toUTCString().toString().split(" ")[4]);
		}, 1000);
	});

	return (
		<div className="Navbar">
			<p>{time}</p>
		</div>
	);
}

// export default Map;
