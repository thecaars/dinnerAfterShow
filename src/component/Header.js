import React, { Component } from 'react';
import axios from 'axios';
import DynamicMainDisplay from './DynamicMainDisplay';
import SavedCombos from './SavedCombos.js';

class Header extends Component {
	constructor() {
		super();
		this.state = {
			userCountry: "",
			userCity: "",
			//TicketMaster states
			venueNames: [],
			eventNames: [],
			venueAddresses: [],
			cityNames: [],
			longitudes: [],
			latitudes: [],
			dateString: '',
			ticketMasterData: [],

			dynamicMainDisplayPage: false,
			savedCombosPage: false,

			venuePage: true,
			restaurantPage: false,
			resetVenueResto: false
		}
}

componentDidMount() {
	const ticketMasterURL = `https://app.ticketmaster.com/discovery/v2/events.json`;
	const ticketMasterKey = `OAKSlXdTBwnYydjVVSFhbh0MrAqawD6u`;

	// Formatting Date for ticketmaster api call
	const newDate = new Date();
	const year = newDate.getFullYear();
	const newMonth = newDate.getMonth() + 1;
	const newDay = newDate.getDate();
	let month = (newMonth < 10) ? "0" + newMonth : newMonth;
	let day = (newDay < 10) ? "0" + newDay : newDay;
	let dateString = (`${year}-${month}-${day}T12:00:00Z`)

	this.setState({ dateString })

	//ticket master api call
	this.getTicketMasterData = (country, city) => {
		axios({
			method: `GET`,
			url: ticketMasterURL,
			dataResponse: `json`,
			params: {
					apikey: ticketMasterKey,
					country: country,
					city: city,
					sort: `date,asc`,
					startDateTime: this.state.dateString
			}
		}).then(results => {
			//change #1
			const resultsReturned = results.data.page.totalPages;

			if (resultsReturned > 0) {
				this.setState({
					ticketMasterData: results.data._embedded.events
				})
				setTimeout(() => {
					document.getElementById('carouselContainer').scrollIntoView()
				}, 10);
			}
			else {
				// ******************************************
				// dynamicMainDisplay shows different content
				// ******************************************
				this.setState({
					ticketMasterData: [],
					dynamicMainDisplayPage: false
				})
				alert(`There aren't any events near you at this time. Please enter another city name.`);
			}

		})
	} // end of getTicketMasterData
}  // end of componentDidMount

handleOnChange = (e) => {
	if (e.target.id === "country") {
			this.setState({
				userCountry: e.target.value
			});
	} else if (e.target.id === "city") {
			this.setState({
				userCity: e.target.value
			});
	};
};

// when form being submitted, press on begin button
handleOnSubmit = (e) => {
	e.preventDefault();
	
	if(this.state.userCity) {

		if (!this.state.resetVenueResto) {
			this.setState({
				dynamicMainDisplayPage: true,
				savedCombosPage: false,
				resetVenueResto: true
			})
		} else {
			this.setState({
				dynamicMainDisplayPage: true,
				savedCombosPage:false,
				resetVenueResto: false
			})
		}

		this.getTicketMasterData(this.state.userCountry, this.state.userCity);

	}  // end of if(this.state.userCity) statement

} // end of handleOnSubmit

displaySavedCombos = () => {
	this.setState({
		dynamicMainDisplayPage: false,
		savedCombosPage: true
	})
}


	render() {
		return (
			<div>
				<header>
					<div className="headerInnerWrapper">
						<h1>DINNER AFTER SHOW</h1>
						<p>Input your country and city to see what upcoming events are happening around you.</p>
						<form onSubmit={this.handleOnSubmit}>
							<div className="input">
								<div className="selectInput">
										<label htmlFor="country"></label>
										<select id="country" name="country" onChange={this.handleOnChange}>
											{/* change #2 */}
											<optgroup label="Country">
												<option value="CA">Canada</option>
												<option value="AU">Australia</option>
												<option value="CA">Canada</option>
												<option value="IN">India</option>
												<option value="IE">Ireland</option>
												<option value="IT">Italy</option>
												<option value="NZ">New Zealand</option>
												<option value="PL">Poland</option>
												<option value="AE">United Arab Emirates</option>
												<option value="UK">United Kingdom</option>
												<option value="US">United States</option>
											</optgroup>
										</select>
											<label htmlFor="city"></label>
									<input id="city" type="text" placeholder="E.g. Toronto" onChange={this.handleOnChange} />
									</div>
									<div className="submitButton">
										<label htmlFor="submitButton" className="visuallyHidden">Begin your search</label>
										<button href="#carouselContainer" id="submitButton" type="submit">Begin</button>
										<label htmlFor="communitySuggestion" className="visuallyHidden">See all posted results</label>
										<button id="communitySuggestion" onClick={this.displaySavedCombos}>Previously Saved Combos</button>
									</div>
								</div>			
						</form>
					</div>
				</header>

				{this.state.dynamicMainDisplayPage
					? <DynamicMainDisplay 
						ticketMasterData={this.state.ticketMasterData}
						venuePage={this.state.venuePage}
						restaurantPage={this.state.restaurantPage}
						resetVenueResto={this.state.resetVenueResto}
						/>
					: null
				}

				{this.state.savedCombosPage
					? <SavedCombos />
					: null
				}
			</div>
		) // end of return()
	} // end of render()
}

export default Header;