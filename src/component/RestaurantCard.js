import React, {Component, Fragment} from 'react';
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
		this.state = ({
			// lat1: null,
			// lon1: null,
			// lat2: null,
			// lon2: null
		})
	}
	
	handleRestaurantClick = (e) => {
		// console.log("e-target-parent-id", e.target.parentElement.id)
		// console.log("e-target-parent", e.target.parentElement)
		// console.log("e-target", e.target)
		// console.log("e", e)
		this.props.getRestaurantCard(e.target.parentElement.id);
	}
	
	componentDidMount() {
	}
	// distanceBetweenLocations Function - works!
	distanceBetweenLocations = (lat1, lon1, lat2, lon2) => {
		const pi = 0.017453292519943295;    //This is  Math.PI / 180
		const equation = 0.5 - Math.cos((lat2 - lat1) * pi) / 2 + Math.cos(lat1 * pi) * Math.cos(lat2 * pi) * (1 - Math.cos((lon2 - lon1) * pi)) / 2;
		const earth = 6371; //  Earth distance in km so it will return the distance in km
		const dist = 2 * earth * Math.asin(Math.sqrt(equation)); 
	}

	componentWillMount() {
		this.setState({
			children: [],
			activeItemIndex: 0,
		});

	// attempting to grab long and lat from venue and resto - need indices
	// const lat1 = this.state.ticketMasterData
	// const lon1 = this.state.ticketMasterData
	// const lat2 = this.state.restaurantData
	// const lon2 = this.state.restaurantData

	// this.setState({
	// 	lat1,
	// 	lon1,
	// 	lat2,
	// 	lon2
	// })
	}

	createChildren = n => range(n).map(i => <div key={i} style={{ "padding": "0 60px", "maxWidth": "100vw", "margin": "0 auto" }}>{i}</div>);

	changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

	render() {
		const {restaurantData, restaurantPage, venuePage} = this.props

		return (
			<Fragment>
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
					rightChevron={'>'}
					leftChevron={'<'}
					// Active item configurations
					activeItemIndex={this.state.activeItemIndex}
					requestToChangeActive={value => this.setState({ activeItemIndex: value })}
				>
				{this.props.restaurantData.map((restaurant, i) => {
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
								<button className="moreInfo">info</button>
							</Link>
							<h3>{restaurant.restaurant.name}</h3>
							<h4>{restaurant.restaurant.cuisines}</h4>
							
							{restaurant.restaurant.user_rating.aggregate_rating > 0 
							? <h4>{restaurant.restaurant.user_rating.aggregate_rating}</h4>
							: <h4>{restaurant.restaurant.user_rating.rating_text}</h4>}
							
							<p>{restaurant.restaurant.location.address}</p>
							<p>Distance from Venue</p>
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