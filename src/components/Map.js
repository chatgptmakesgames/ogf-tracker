import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Polyline, Marker} from "react-leaflet";
import { useState, useEffect } from "react";
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
			body: "[out:json];rel(" + id + ");out geom;",
		},
	);

	const request = await api.json();

	let path = [];
	let markers = [];
	let tags = {};
	console.log(request.elements);
	for (let element of request.elements){
		console.log(element.members)
			for (let member of element.members){
				if (member.type === "way" && member.role === ""){ // "" means rail
					for (let geo of member.geometry){
						path.push([geo.lat, geo.lon]);
					}
				}
				if (member.type === "node" && member.role === "stop"){
					markers.push([member.lat, member.lon]);
				}
			}
			for (const [key, value] of Object.entries(element.tags)){
					if (key === 'name'){ tags[key] =  value} //[2] == to
					if (key === 'colour'){ tags[key] = value;} //[0] == colour
					if (key === 'from'){ tags[key] = value;} //[1] == from
					if (key === 'to'){ tags[key] = value;} //[2] == to				
			}
	}

	
	return {
		path: path,
		markers: markers,
		tags: tags
	};
}

async function retreive() {
	let retreive = await callRelation(326404);
	return retreive;
}


export default function Map() {
	const [data, setData] = useState({path: [], markers: [], tags: []});
	useEffect(() => {
		retreive().then((data) => {
			setData(data);
		});
	},[data]);

	return (
		<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='<a href="//opengeofiction.net">OpenGeofiction</a> contributors (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
				url="https://tile.opengeofiction.net/ogf-carto/{z}/{x}/{y}.png"
			/>
			<Polyline pathOptions={{color: data.tags.colour, weight: 5, opacity: 0.9}} positions={data.path} />
			{data.markers.map((x) => (
				<Marker
					key={x}
					position={x}
				></Marker>
			))}	
			
				
			
		</MapContainer>
	);
}


