import React, {Component} from 'react';
import App from '../App'
// import Modal from './Modal.js';
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Link
// } from 'react-router-dom'


// const restaurantCARD= {
//     height: "100px",
//     width: "100px",
//     background: "red"
// }


class RestaurantCard extends Component {

	// handleClick = (e) => {
	// 	this.props.getVenueCard(e.target.parentElement.id);
	// }


	render() {

		const {restaurantData} = this.props

		const restaurantCards = restaurantData.map((restaurant, i) => {
			return (
				<div className="restaurantCard" key={restaurant.id} id={i} onClick={this.handleClick} role="button">
					<a href="#"><i>i</i></a>
					<h3>{restaurant.restaurant.name}</h3>
					<h4>{restaurant.restaurant.cuisines}</h4>
					{/* if aggregate_rating > 0 */}
					<h4>{restaurant.restaurant.user_rating.aggregate_rating}</h4>
					{/* else if aggregate_rating === 0 */}
					<h4>{restaurant.restaurant.user_rating.rating_text}</h4>
					<p>{restaurant.restaurant.location.address}</p>
					<p>Distance from Venue</p>
				</div>
			)
		})
		return(
			<div>
				{restaurantCards}
			</div>
		)
	};
};

export default RestaurantCard;