import React, { Component, Fragment } from 'react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import Modal from './Modal.js';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'



class RestaurantCard extends Component {
	constructor() {
		super();
		this.state = {
			children: [],
			activeItemIndex: 0,
			distanceArray: [],
			distanceRounded: 0,
			// selectedCard: [],
		}
	}


	// handleRestaurantClick = (e) => {
	// 	this.handleInfoClick(e)
	// 	if (this.state.selectedCard) {
	// 		e.target.parentElement.className = `restaurantCard show`
	// 	} else if (!this.state.selectedCard) {
	// 		e.target.parentElement.className = `restaurantCard hide`
	// 	}
	// 	this.setState({
	// 		selectedCard: !this.state.selectedCard
	// 	})
	// };

	handleInfoClick = (e) => {
		const clickedRestaurantId = e.target.parentElement.id
		this.props.getRestaurantCard(clickedRestaurantId);
	}


	dataFunction = (venue, restaurant, i) => {
		const lat1 = venue._embedded.venues[0].location.latitude
		const lon1 = venue._embedded.venues[0].location.longitude
		const lat2 = restaurant[i].restaurant.location.latitude
		const lon2 = restaurant[i].restaurant.location.longitude
		this.distanceBetweenLocations(lat1, lon1, lat2, lon2)
	}

	distanceBetweenLocations = (lat1, lon1, lat2, lon2) => {
		const pi = 0.017453292519943295;    //This is  Math.PI / 180
		const equation = 0.5 - Math.cos((lat2 - lat1) * pi) / 2 + Math.cos(lat1 * pi) * Math.cos(lat2 * pi) * (1 - Math.cos((lon2 - lon1) * pi)) / 2;
		const earth = 6371; //  Earth distance in km so it will return the distance in km
		const distanceBetweenLocations = 2 * earth * Math.asin(Math.sqrt(equation));
		const distanceInMetres = distanceBetweenLocations * 1000
		const distanceRounded = Math.round(distanceInMetres)
		this.state.distanceArray.push(distanceRounded)

		// TRYING TO GET A HEADING TO SHOW IN BETWEEN H2 AND CAROUSEL WHEN RESTAURANT DISTANCE IS OVER 1000m
		// if (this.props.restaurantPage && distanceRounded > 1000) {
		// 	this.setState({
		// 		distanceRounded: distanceRounded
		// 	})
		// }
	}

	

	render() {
		const { restaurantData, restaurantPage, venuePage } = this.props

		return (
			<Fragment>
				{this.props.restaurantData == true ? this.dataFunction() : null}

				{/* TRYING TO GET A HEADING TO SHOW IN BETWEEN H2 AND CAROUSEL WHEN RESTAURANT DISTANCE IS OVER 1000m */}
				{/* <div className="farRestaurantWarning">{this.props.restaurantPage && this.state.distanceRounded > 1000 ? `WORK PLZ` : null}</div> */}

				<ItemsCarousel
					// Carousel configurations
					numberOfCards={this.props.screenWidth > 980 ? 3 : this.props.screenWidth > 710 ? 2 : 1}
					gutter={10}
					slidesToScroll={1}
					activePosition={'center'}
					outsideChevron={true}
					showSlither={false}
					firstAndLastGutter={true}
					chevronWidth={50}
					rightChevron={'>'}
					leftChevron={'<'}
					// Active item configurations
					activeItemIndex={this.state.activeItemIndex}
					requestToChangeActive={value => this.setState({ activeItemIndex: value })}
				>
				{this.props.restaurantData.map((restaurant, i) => {
					{ this.dataFunction(this.props.venueUserInput, this.props.restaurantData, i) }
					return (
						<Fragment>
							<div 
								className={`restaurantCard ${this.props.selectedRestoCardId === i ? `show` : `hide`}`} 
								key={restaurant.id} 
								id={i} 
								role="button"
								onClick={() => { this.props.changeSelectedRestoCard(i)}}
							>
									<Link to={{
										pathname: restaurantPage ? '/modal' : undefined, 
										state: {
											restaurantSpecificId: i,
											restaurantPage: restaurantPage,
											venuePage: venuePage,
											restaurantData: restaurantData,
											displayModal: true, 
										}}}>	
										<button onClick={this.handleInfoClick} className="moreInfo"><i className="fas fa-info-circle"></i></button>
									</Link>
								
								<div className="imageContainer">
									<img className="imageContainer" src="./../../assets/pepe-nero-88205-unsplash.jpg" alt="dinner place setting" />
								</div>
								
								<h3>{restaurant.restaurant.name}</h3>
								<p>{restaurant.restaurant.cuisines}</p>
								
								{restaurant.restaurant.user_rating.aggregate_rating > 0 
								? <h4>{restaurant.restaurant.user_rating.aggregate_rating}</h4>
								: <h4>{restaurant.restaurant.user_rating.rating_text}</h4>}
								
								<p>{restaurant.restaurant.location.address}</p>
								<p>Distance from Venue: {this.state.distanceArray[i]}m</p>
								<div className="overlay" onClick={this.handleInfoClick}></div>
							</div>
						</Fragment>
					)
				})}
				</ItemsCarousel>
				<Route path="/modal" component={Modal}></Route>
			</Fragment>
		)
	};
}		

export default RestaurantCard;