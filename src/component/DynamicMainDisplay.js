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
            venuePage:false,
            restaurantPage:false,
            confirmationPage: false,
            savedCombosPage: false,
            modalPage: false,
            
            // User Input States - keeping track of user values from input
						venueUserInput: [],
            restaurantUserInput: [],
            userInputCombination: [],
						ticketMasterData: []
        }
    } //end of constructor 

    componentDidMount() {
        const zomatoURL = `https://developers.zomato.com/api/v2.1/geocode`;
        const zomatoKey = `105eeb0d2c69617a061003c1a4f82e13`;

			//zomato api call
			this.getRestaurantData = (longitude, latitude) => {
					axios({
						method: `GET`,
						url: zomatoURL,
						dataResponse: `json`,
						params: {
							apikey: zomatoKey,
							radius: 1000,
							lat: latitude,
							long: longitude,
							start: 1,
							count: 20
						}
					}).then(results => {
						this.setState({
							restaurantData: results.data.nearby_restaurants,
						})
						// const restaurantName = [];
						// const restaurantCuisine = [];
						// const restaurantPriceRange = [];
						// const restaurantRating = [];
						// const restaurantAddress = [];
						// const restaurantUrl = [];
			
						console.log(results.data.nearby_restaurants[0].restaurant.name)

						// for (let i = 0; i < results.data.nearby_restaurants.length; i++) {
						// 	restaurantName.push(results.data.nearby_restaurants[i].restaurant.name);
						// 	restaurantCuisine.push(results.data.nearby_restaurants[i].restaurant.cuisines);
						// 	restaurantPriceRange.push(results.data.nearby_restaurants[i].restaurant.price_range);
						// 	restaurantRating.push(results.data.nearby_restaurants[i].restaurant.user_rating.aggregate_rating);
						// 	restaurantAddress.push(results.data.nearby_restaurants[i].restaurant.location.address);
						// 	restaurantUrl.push(results.data.nearby_restaurants[i].restaurant.url);
			
						// 	this.setState({
						// 		restaurantNames: restaurantName,
						// 		restaurantCuisine: restaurantCuisine,
						// 		restaurantPriceRange: restaurantPriceRange,
						// 		restaurantRating: restaurantRating,
						// 		restaurantAddress: restaurantAddress,
						// 		restaurantUrl: restaurantUrl,
						// 	});
						// } // end of for statement
					}) // end of .then method
				} // end of getRestaurantData
      }// end of componentDidMount

      getVenueCard = (venueId) => {
        this.setState({
					venueUserInput: this.props.ticketMasterData[venueId],
					longitudeUserInput: this.props.ticketMasterData[venueId]._embedded.venues[0].location.longitude,
					latitudeUserInput: this.props.ticketMasterData[venueId]._embedded.venues[0].location.latitude,
        })
				this.getRestaurantData(this.props.ticketMasterData[venueId]._embedded.venues[0].location.longitude, this.props.ticketMasterData[venueId]._embedded.venues[0].location.latitude);
			}
      
      render(){
        
        return(
            <Fragment>
                <h2>This is the h2</h2>
                <Carousel ticketMasterData={this.props.ticketMasterData} getVenueCard={this.getVenueCard} restaurantData={this.state.restaurantData}/>
                <button></button>
            </Fragment>
        )
    }
} // end of the class function

export default DynamicMainDisplay