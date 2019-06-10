import React, {Component} from 'react';
import VenueCard from './VenueCard.js';
import RestaurantCard from './RestaurantCard.js';

class Carousel extends Component {
	render() {
		return (
			<div id="carouselContainer" className="carouselContainer wrapper">
			{this.props.venuePage 
				? <VenueCard id="venueCard"
					ticketMasterData={this.props.ticketMasterData}
					getVenueCard={this.props.getVenueCard}
					venuePage={this.props.venuePage}
					restaurantPage={this.props.restaurantPage}
				/>
				: <RestaurantCard 
					restaurantData={this.props.restaurantData}
					getRestaurantCard={this.props.getRestaurantCard}
					venuePage={this.props.venuePage}
					restaurantPage={this.props.restaurantPage}
					ticketMasterData={this.props.ticketMasterData}
					venueUserInput={this.props.venueUserInput}
				/>
			}
			</div>
		)
	}
}

export default Carousel