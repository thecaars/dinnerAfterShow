import React, { Component, Fragment } from 'react';
import ItemsCarousel from 'react-items-carousel';
import DistanceBetween from 'DistanceBetween';
import range from 'lodash/range';
import Modal from './Modal.js';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'



class RestaurantCard extends Component {

	handleRestaurantClick = (e) => {
		this.props.getRestaurantCard(e.target.parentElement.id);
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
									<button>info</button>
								</Link>
								<h3>{restaurant.restaurant.name}</h3>
								<h4>{restaurant.restaurant.cuisines}</h4>
								
								{restaurant.restaurant.user_rating.aggregate_rating > 0 
								? <h4>{restaurant.restaurant.user_rating.aggregate_rating}</h4>
								: <h4>{restaurant.restaurant.user_rating.rating_text}</h4>}
								
								<p>{restaurant.restaurant.location.address}</p>
								<DistanceBetween 
									restaurantData={this.props.restaurantData}
									getRestaurantCard={this.props.getRestaurantCard}
									venuePage={this.props.venuePage}
									restaurantPage={this.props.restaurantPage}
									ticketMasterData={this.props.ticketMasterData}
									venueUserInput={this.props.venueUserInput}
								/>
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