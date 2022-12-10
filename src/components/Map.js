import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";

function callRelation(id) {
	(async () => {
		const api = await fetch(
			"https://overpass.ogf.rent-a-planet.com/api/interpreter",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: "[out:json];rel(" + id + ");(._;>>;);out;",
			},
		);
		const answer = await api.json();
		console.log(answer.elements.length);
		console.log(answer.elements[0].lat + ", " + answer.elements[0].lon);
	})();
}

callRelation(188466);

export default function FlightMap() {
	return (
		<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				/*attribution='<a href="//opengeofiction.net">OpenGeofiction</a> contributors (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
				url="https://tile.opengeofiction.net/ogf-carto/{z}/{x}/{y}.png"*/
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</MapContainer>
	);
}
