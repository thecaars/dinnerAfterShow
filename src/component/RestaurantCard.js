import React, { Component, Fragment } from 'react';
import ItemsCarousel from 'react-items-carousel';
// import range from 'lodash/range';
import Modal from './Modal.js';
import {
	Route,
	Link
} from 'react-router-dom'
import plateSetting from '../assets/plateSetting.jpg'


class RestaurantCard extends Component {
	constructor() {
		super();
		this.state = {
			children: [],
			activeItemIndex: 0,
			distanceArray: [],
			distanceRounded: 0,
			distanceOver1000m: false,
		}
	}

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

	}

	checkForWithin1km = () => {
		if (!this.state.distanceOver1000m){
			this.setState({
			distanceOver1000m: true
		})
		}
	} 

	render() {
		const { restaurantData, restaurantPage, venuePage } = this.props

		return (
			<Fragment>
				{this.state.distanceOver1000m ? <h2>WARNING it's gonna be a lot of walking!</h2> : null}

				<ItemsCarousel
					// Carousel configurations
					numberOfCards={this.props.screenWidth > 980 ? 3 : this.props.screenWidth > 710 ? 2 : 1}
					gutter={10}
					slidesToScroll={1}
					activePosition={'center'}
					outsideChevron={true}
					showSlither={false}
					firstAndLastGutter={true}
					chevronWidth={30}
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
								tabIndex="0"
							>
									<Link to={{
										pathname: restaurantPage ? '/modal' : undefined, 
										state: {
											restaurantSpecificId: i,
											restaurantPage: restaurantPage,
											venuePage: venuePage,
											restaurantData: restaurantData,
											displayModal: true, 
										}
									}} tabIndex="-1">	
										<button onClick={this.handleInfoClick} className="moreInfo"><i className="fas fa-info-circle"></i></button>
									</Link>
								
								<div className="imageContainer">
									<img className="imageContainer" src={plateSetting} alt="A dinner place setting." />
								</div>
								
								<h3>{restaurant.restaurant.name}</h3>
								<p>{restaurant.restaurant.cuisines}</p>
								
								{restaurant.restaurant.user_rating.aggregate_rating > 0 
								? <h4>{restaurant.restaurant.user_rating.aggregate_rating}</h4>
								: <h4 className="notRated">{restaurant.restaurant.user_rating.rating_text}</h4>}
								
								<p>{restaurant.restaurant.location.address}</p>

								<p>Distance from Venue: <span>{this.state.distanceArray[i]}m</span></p>
								
								<div className="overlay" onClick={this.handleRestaurantClick}></div>
							</div>
						</Fragment>
					)
				})}
				</ItemsCarousel>
				{this.state.distanceArray[0] > 1000 ? this.checkForWithin1km() : null}
				<Route path="/modal" component={Modal}></Route>
			</Fragment>
		)
	};
}		

export default RestaurantCard;