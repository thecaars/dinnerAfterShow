import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Carousel from './Carousel'

class DynamicMainDisplay extends Component {
	constructor(){
			super();
			this.state = {
		//Zomato states
				restaurantData: [],
				restaurantNames: [],
				restaurantCuisine: [],
				restaurantPriceRange: [],
				restaurantRating: [],
				restaurantAddress: [],
				restaurantUrl: [],
				
				// Page state - controlling when they appear
				venuePage: true,
				restaurantPage:false,
				confirmationPage: false,
				savedCombosPage: false,
				modalPage: false,
				
				// User Input States - keeping track of user values from input
				venueUserInput: false,
				restaurantUserInput: false,
				userInputCombination: [],
				ticketMasterData: [],
				restaurantData: []
			}
		} //end of constructor 

	componentDidMount() {
		const zomatoURL = `https://developers.zomato.com/api/v2.1/search`;
		const zomatoKey = `105eeb0d2c69617a061003c1a4f82e13`;

		//zomato api call
		this.getRestaurantData = (longitude, latitude) => {
			axios({
				method: `GET`,
				url: zomatoURL,
				dataResponse: `json`,
				params: {
					apikey: zomatoKey,
					// radius: 1000,
					lat: latitude,
					lon: longitude,
					// start: 1,
					// count: 20
				}
			}).then(results => {
				this.setState({
					restaurantData: results.data.restaurants,
				})
			}) // end of .then method
		} // end of getRestaurantData
	}// end of componentDidMount

	getVenueCard = (venueId) => {
	this.setState({
			venueUserInput: this.props.ticketMasterData[venueId],
		})		
	} // end of getvenueCard 
	
	displayRestaurantCards = () => {
		const longitude = this.state.venueUserInput._embedded.venues[0].location.longitude;
		const latitude = this.state.venueUserInput._embedded.venues[0].location.latitude;
		// calling the zomato API
		this.getRestaurantData(longitude, latitude);
		// changing from venue display to restaurant display
		this.setState({
			venuePage: false,
			restaurantPage: true
		})
	}
	
	getRestaurantCard = (restaurantId) => {
		this.setState({
			restaurantUserInput: this.state.restaurantData[restaurantId]
		})
	}	
	// confirming/combining selection VENUE and RESTO to the COMBO state
	confirmUserInputChoices = () => {
		this.setState({
			userInputCombination: [this.state.venueUserInput, this.state.restaurantUserInput]
		})
	}

	render(){        
		return(
			<Fragment>
				<h2>This is the h2</h2>
				<Carousel 
					venuePage={this.state.venuePage}
					ticketMasterData={this.props.ticketMasterData}
					getVenueCard={this.getVenueCard}
					restaurantPage={this.state.restaurantPage}
					restaurantData={this.state.restaurantData}
					getRestaurantCard={this.getRestaurantCard}
				/>
				<button 
					onClick={ !this.state.restaurantUserInput ? this.displayRestaurantCards : this.confirmUserInputChoices}>CONFIRMM BUTTON
				</button>
			</Fragment>
		)
	}
} // end of the class function

export default DynamicMainDisplay