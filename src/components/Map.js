import React from "react";
import { MapContainer, TileLayer, Marker, Circle, CircleMarker, Polyline} from "react-leaflet";
import "leaflet-polylineoffset";
// import "./PolyLineOffset";

// import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
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


// var list = [326404, 334173];
// var num = 326404;

async function retreive() {
	let vals = [326404, 334173, 335847, 325718, 312320, 335340];
	let set = [];

	for (let val of vals){
		let retreive = await callRelation(val);
		set.push(retreive)
	}
	return set;
}

export const CustomPolyline = (props) => {
	return <Polyline offset={5} {...props} />
  }

// retreive(326404);

// async function retreive(list){
// 	for (const rel of list){
// 		await callRelation(rel)
// 	}
// }

// function TestMarker({data}){
// 	const {lat, lon} = data;
// 	const [prevPos, setPrevPos] = useState([lat, lon]);

// 	useEffect(() =>{
// 		if (prevPos[1] !== lon && prevPos[0] !== lat){
// 			setPrevPos([lat, lon]);
// 		}
// 	}, [lat, lon, prevPos])

// 	return <LeafletTrackingMarker position={[lat, lon]}
// }

export default function Map() {
	const [data, setData] = useState([{path: [], markers: [], tags: []}]);
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

		{data.map((x, index) => (
  			<div key={index}>
    			<Polyline pathOptions={{color: x.tags.colour, weight: 4}} positions={x.path} offset={5}/>
    				
  			</div>
		))}
				
					


			
		</MapContainer>
	);
}


//{x.markers.map((y) => (
//	<CircleMarker radius={4} key={y} center={y} color={x.tags.colour} fillColor={"white"} fillOpacity={1}>
//	</CircleMarker>
//))}


// {/* <Polyline pathOptions={{color: data[0].tags.colour, weight: 5}} positions={data[0].path} />
//  				{data[0].markers.map((x) => (
// 					<CircleMarker radius={4} key={x} center={x} color={data[0].tags.colour} fillColor={"white"} fillOpacity={1}>
// 					</CircleMarker>
// 				))} */}