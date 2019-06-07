import React, {Component} from 'react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
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
	handleRestaurantClick = (e) => {
		this.props.getRestaurantCard(e.target.parentElement.id);
	}
	
	distanceBetweenLocations = (lat1, lon1, lat2, lon2) => {
		var pi = 0.017453292519943295;    //This is  Math.PI / 180
		var equation = 0.5 - Math.cos((lat2 - lat1) * pi) / 2 + Math.cos(lat1 * pi) * Math.cos(lat2 * pi) * (1 - Math.cos((lon2 - lon1) * pi)) / 2;
		var earth = 6371; //  Earth distance in km so it will return the distance in km
		var dist = 2 * earth * Math.asin(Math.sqrt(equation)); 
	}

componentWillMount() {
		this.setState({
			children: [],
			activeItemIndex: 0,
		});
	}

	createChildren = n => range(n).map(i => <div key={i} style={{ "padding": "0 60px", "maxWidth": "100vw", "margin": "0 auto" }}>{i}</div>);

	changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

	render() {
		return (
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
					<div className="restaurantCard" key={restaurant.restaurant.id} id={i} onClick={this.handleRestaurantClick} role="button">
						<a href="./RestaurantInfoModal"><i>i</i></a>
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
			})}
			</ItemsCarousel>
		)
	};
}		

export default RestaurantCard;