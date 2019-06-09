import React, { Component, Fragment } from 'react';

class DistanceBetween extends Component {
	componentDidUpdate() {
		this.dataFunction()
	}

	dataFunction = (restaurant) => {
		const lat1 = this.props.venueUserInput._embedded.venues[0].location.latitude
		const lon1 = this.props.venueUserInput._embedded.venues[0].location.longitude
		// const lat2 = 
		// const lon2 = 
		this.distanceBetweenLocations(lat1, lon1)
	}

	distanceBetweenLocations = (lat1, lon1, lat2, lon2) => {
		const pi = 0.017453292519943295;    //This is  Math.PI / 180
		const equation = 0.5 - Math.cos((lat2 - lat1) * pi) / 2 + Math.cos(lat1 * pi) * Math.cos(lat2 * pi) * (1 - Math.cos((lon2 - lon1) * pi)) / 2;
		const earth = 6371; //  Earth distance in km so it will return the distance in km
		const dist = 2 * earth * Math.asin(Math.sqrt(equation));
		console.log(dist)
	}

	render() {
		return (
			<p>Distance Between</p>
		)
	}	
}

export default DistanceBetween