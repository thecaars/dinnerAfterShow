import React, {Component} from 'react';
import App from '../App'
import Modal from './Modal.js';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'


// const restaurantCARD= {
//     height: "100px",
//     width: "100px",
//     background: "red"
// }


class RestaurantCard extends Component {



	render() {
		return (
			<div className="restaurantCard">
				<a href="#"><i>i</i></a>
				<h3>this.props.restaurantName</h3>
				<h4>this.props.restaurantCuisine</h4>
				<h4>this.props.rating</	h4>
				<p>this.props.restaurantAddress</p>
				<p>Distance from Venue</p>
			</div>
		)
	};
};

export default RestaurantCard;