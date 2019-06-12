import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Carousel from './Carousel.js';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'
import Modal from './Modal.js';
import ProgressBar from './ProgressBar.js';

class DynamicMainDisplay extends Component {
	constructor(props){
			super(props);
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
				restaurantPage: false,
				resetVenueResto: this.props.resetVenueResto,
				confirmationPage: false,
				savedCombosPage: false,
				modalPage: false,
				
				// User Input States - keeping track of user values from input
				venueUserInput: false,
				restaurantUserInput: false,
				userInputCombination: false,
				ticketMasterData: [],
				// restaurantData: [], // duplicate of above

				// Progress Bar Initial State (Starts at 33.34% to indicate Stage 1 of 3 is complete)
				percentage: 33.34,

				// screen width for responsiveness of carousel
				screenWidth: 0
			}
		} //end of constructor 

	componentDidUpdate(prevProps) {
		if (this.props.resetVenueResto !== prevProps.resetVenueResto) {
			this.setState({
				venuePage: true,
				restaurantPage: false
			})
		}
	}

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
					start: 1,
					count: 20,
					lat: latitude,
					lon: longitude,
					radius: 1000,
					sort: "real_distance"
				}
			}).then(results => {
				this.setState({
					restaurantData: results.data.restaurants,
				})
			}) // end of .then method
		} // end of getRestaurantData

		const intViewportWidth = window.innerWidth;
		// console.log(intViewportWidth)
		this.setState({
			screenWidth: intViewportWidth
		})
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
	} // end of displayRestaurantCards
	
	getRestaurantCard = (restaurantId) => {
		this.setState({
			restaurantUserInput: this.state.restaurantData[restaurantId],
			userInputCombination: [this.state.venueUserInput, this.state.restaurantData[restaurantId]] 
			
		})
	}	 // end of getRestaurantCard

	// confirming/combining selection VENUE and RESTO to the COMBO state
	confirmUserInputChoices = () => {
		this.setState({
			// create a userInputCombination state
			restaurantPage: false,
			// userInputCombination: [this.state.venueUserInput, this.state.restaurantUserInput]
		})
	} // end of confirmUserInputChoices

	handleClick = () => {
		// Adds to ProgressBar with each click
		if (this.state.venuePage && this.state.venueUserInput) {
			this.displayRestaurantCards()
			this.setState({
				percentage: this.state.percentage + 33.33
			})	
		}
		else if (this.state.restaurantPage && this.state.restaurantUserInput){
			this.confirmUserInputChoices()
			this.setState({
				percentage: this.state.percentage + 33.33
			})
		}
		// Error handling if no event is selected before trying to proceed
		else if (this.state.venuePage && this.state.venueUserInput === false) {
			alert("Please select an event.");
		}
		// Error handling if no restaurant is selected before trying to proceed
		else if (this.state.restaurantPage && this.state.restaurantUserInput === false) {
			alert("Please select a restaurant.");

		}
	} // end of handleClick

	render() {
		return(
			<Fragment>
				<div className="dynamicMainDisplay">
					<ProgressBar percentage={this.state.percentage}/>

					<h2>Please make a selection</h2>
					<Carousel 
						venuePage={this.state.venuePage}
						ticketMasterData={this.props.ticketMasterData}
						getVenueCard={this.getVenueCard}
						restaurantPage={this.state.restaurantPage}
						userInputCombination={this.state.userInputCombination}
						restaurantData={this.state.restaurantData}
						getRestaurantCard={this.getRestaurantCard}
						venueUserInput={this.state.venueUserInput}
						screenWidth={this.state.screenWidth}
					/>
					<Link className="dynamicConfirmButtonContainer" to={{
						pathname: this.state.restaurantUserInput ? '/modal' : undefined, 
						state: {
							userInputCombination: [this.state.venueUserInput, this.state.restaurantUserInput],
							restaurantPage: false,
							venuePage: false,
							displayModal: true
						}
					}}>
						<button className="dynamicConfirmButton" onClick={this.handleClick}>Confirm Selection</button>
					</Link>
					<Route path="/modal" component={Modal}></Route>
				</div>
			</Fragment>
		)
	}
} // end of the class function

export default DynamicMainDisplay