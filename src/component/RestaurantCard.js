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
		}
	}

	handleRestaurantClick = (e) => {
		this.props.getRestaurantCard(e.target.parentElement.id);
	}

	// createChildren = n => range(n).map(i => <div key={i} style={{ "padding": "0 60px", "maxWidth": "100vw", "margin": "0 auto" }}>{i}</div>);

	// changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

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
	}

	render() {
		const { restaurantData, restaurantPage, venuePage } = this.props

		return (
			<Fragment>
				{this.props.restaurantData == true ?

					this.dataFunction()

					: null}
				<ItemsCarousel
					// Carousel configurations
					numberOfCards={3}
					gutter={10}
					slidesToScroll={1}
					activePosition={'center'}
					outsideChevron={true}
					showSlither={false}
					firstAndLastGutter={true}
					chevronWidth={50}
					rightChevron={'	>'}
					leftChevron={'<'}
					// Active item configurations
					activeItemIndex={this.state.activeItemIndex}
					requestToChangeActive={value => this.setState({ activeItemIndex: value })}
				>
				{this.props.restaurantData.map((restaurant, i) => {
					{ this.dataFunction(this.props.venueUserInput, this.props.restaurantData, i) }
					return (
						<div className="restaurantCard" key={restaurant.id} id={i} onClick={this.handleRestaurantClick} role="button">
							<Link to={{
								pathname: restaurantPage ? '/modal' : undefined, 
								state: {
									restaurantSpecificId: i,
									restaurantPage: restaurantPage,
									venuePage: venuePage,
									restaurantData: restaurantData,
									displayModal: true, 
								}}}>	
								<button className="moreInfo"><i className="fas fa-info-circle"></i></button>
							</Link>
							<h3>{restaurant.restaurant.name}</h3>
							
							<h4>{restaurant.restaurant.cuisines}</h4>
							
							{restaurant.restaurant.user_rating.aggregate_rating > 0 
							? <h4>{restaurant.restaurant.user_rating.aggregate_rating}</h4>
							: <h4>{restaurant.restaurant.user_rating.rating_text}</h4>}
							
							<p>{restaurant.restaurant.location.address}</p>

							<p>Distance from Venue: {this.state.distanceArray[i]}m</p>
						</div>
					)
				})}
				</ItemsCarousel>
				<Route path="/modal" component={Modal}></Route>
			</Fragment>
		)
	};
}		

export default RestaurantCard;