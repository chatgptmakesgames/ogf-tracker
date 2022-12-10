import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "./Map.css";

async function callRelation(id) {
    const api = await fetch("https://www.overpass-api.de/api/interpreter?", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: "[out:json];rel(" + id + ");(._;>;);out;",
    });

    const request = await api.json();
    let path = [];

    for (let pair of request.elements) {
        if (pair.type === "node") {
            path.push([pair.lat, pair.lon]);
        }
    }
    return path;
}

async function retreive() {
    let test1 = await callRelation(188466);
    console.log(test1);
    return test1;
}

const limeOptions = {color:'lime'}
const test = [[1,2],[3,1]]

export default function Map() {
	return (
		<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='<a href="//opengeofiction.net">OpenGeofiction</a> contributors (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
				url="https://tile.opengeofiction.net/ogf-carto/{z}/{x}/{y}.png"
			/>
            <Polyline pathOptions={limeOptions} positions={retreive()}/>
		</MapContainer>
	);
}
