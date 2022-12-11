import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "./Map.css";

async function callRelation(id) {
	const api = await fetch(
		"https://overpass.ogf.rent-a-planet.com/api/interpreter",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: "[out:json];rel(" + id + ");(._;>;);out;",
		},
	);

	const request = await api.json();

	let path = [];
	console.log(request.elements);
	for (let pair of request.elements) {
		if (pair.type === "node") {
			path.push([pair.lat, pair.lon]);
		}
	}

	return path.slice(0, 5);
}

async function retreive() {
	let test1 = await callRelation(188466);
	console.log(test1);
	return test1;
}
const blackOptions = { color: "black" };

export default function Map() {
	const [test, setTest] = React.useState([]);
	React.useEffect(() => {
		retreive().then((test) => {
			// When data is received, assign it to the state,
			// so that React is aware of the change
			// and re-renders the component with updated data
			setTest(test);
		});
	}, []);

	return (
		<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='<a href="//opengeofiction.net">OpenGeofiction</a> contributors (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
				url="https://tile.opengeofiction.net/ogf-carto/{z}/{x}/{y}.png"
				// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Polyline pathOptions={blackOptions} positions={test} />
		</MapContainer>
	);
}
