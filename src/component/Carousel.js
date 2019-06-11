import React, {Component} from 'react';
import VenueCard from './VenueCard.js';
import RestaurantCard from './RestaurantCard.js';

class Carousel extends Component {
	constructor(){
		super()
		this.state ={
			selectedCardId:null,
			selectedRestoCardId:null
		}
	}
	
	changeSelectedCard =(i)=>{
		this.props.getVenueCard(i);
		this.setState({
			selectedCardId:i
		})
	}

	changeSelectedRestoCard = (i) => {
		this.props.getRestaurantCard(i);
		this.setState({
			selectedRestoCardId: i
		})
	}


	render() {
		return (
			<div id="carouselContainer" className="carouselContainer wrapper">
			{this.props.venuePage 
				? <VenueCard id="venueCard"
					ticketMasterData={this.props.ticketMasterData}
					getVenueCard={this.props.getVenueCard}
					venuePage={this.props.venuePage}
					restaurantPage={this.props.restaurantPage}
					selectedCardId={this.state.selectedCardId}
					changeSelectedCard={this.changeSelectedCard}
					screenWidth={this.props.screenWidth}
				/>
				: <RestaurantCard 
					restaurantData={this.props.restaurantData}
					getRestaurantCard={this.props.getRestaurantCard}
					venuePage={this.props.venuePage}
					restaurantPage={this.props.restaurantPage}
					ticketMasterData={this.props.ticketMasterData}
					venueUserInput={this.props.venueUserInput}
					screenWidth={this.props.screenWidth}
					changeSelectedRestoCard={this.changeSelectedRestoCard}
					selectedRestoCardId={this.state.selectedRestoCardId}
				/>
			}
			</div>
		)
	}
}

export default Carousel