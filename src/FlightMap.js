import "./map.css";
import React, { Component } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { NightRegion } from "react-leaflet-night-region";

import airports from "./data/airport-locations.json";

export default function FlightMap() {
	return (
		<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='<a href="//opengeofiction.net">OpenGeofiction</a> contributors (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
				url="https://tile.opengeofiction.net/ogf-carto/{z}/{x}/{y}.png"
			/>
			{airports.map((airport) => (
				<Marker key={airport.ID} position={airport.coordinates}></Marker>
			))}
		</MapContainer>
	);
}
