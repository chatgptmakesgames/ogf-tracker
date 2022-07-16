import "./map.css";
import React, { Component } from "react";
import L from "leaflet";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";

import airports from "./data/airport-locations.json";

function setGlobal() {
	return L.icon({
		iconUrl: require("./assets/AirportG.png"),
		iconSize: 20,
	});
}
export default function FlightMap() {
	// airports = airports.filter((airport) => airport.type === "G");
	var GlobalAirports = new L.FeatureGroup();
	return (
		<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='<a href="//opengeofiction.net">OpenGeofiction</a> contributors (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
				url="https://tile.opengeofiction.net/ogf-carto/{z}/{x}/{y}.png"
			/>
			{airports.map((airport) => (
				<Marker
					key={airport.ID}
					position={airport.coordinates}
					icon={setGlobal()}
				></Marker>
			))}
		</MapContainer>
	);
}
