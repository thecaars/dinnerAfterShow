import React, {Component} from 'react';
import axios from 'axios';
import Header from './component/Header.js';
import DynamicMainDisplay from './component/DynamicMainDisplay';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TicketMaster endpoints
      venueNames: [],
      eventNames: [],
      venueAddresses: [],
      cityNames: [],
      longitudes: [],
      latitudes: [],
      dateString: '',
      
      //Zomato endpoints
      restaurantNames: [],
      restaurantCuisine: [],
      restaurantPriceRange: [],
      restaurantRating: [],
      restaurantAddress: [],
      restaurantUrl: [],
      
      // Page state - controlling when they appear
      venuePage: false,
      restaurantPage: false,
      confirmationPage: false,
      savedCombosPage: false,
      modalPage: false,
      
      // User Input States - keeping track of user values from input
      countryUserInput: ``,
      cityUserInput: ``,
      venueUserInput: {},
      restaurantUserInput: {},
      userInputCombination: []
    };
  }
  
  componentDidMount() {
    const ticketMasterURL = `https://app.ticketmaster.com/discovery/v2/events.json`;
    const ticketMasterKey = `OAKSlXdTBwnYydjVVSFhbh0MrAqawD6u`;
    const zomatoURL = `https://developers.zomato.com/api/v2.1/geocode`;
    const zomatoKey = `105eeb0d2c69617a061003c1a4f82e13`;

    const newDate = new Date();
    const year = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    const newDay = newDate.getDay();
    let month = (newMonth < 10) ? "0" + newMonth : newMonth;
    let day = (newDay < 10) ? "0" + newDay : newDay;
    let date = (`${year}-${month}-${day}T12:00:00Z`)

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
        startDateTime: this.state.date
      }
    }).then(results => {
      console.log(this.state.date)
      const venueName = [];
      const eventName = [];
      const venueAddress = [];
      const cityName = [];
      const longitude = [];
      const latitude = [];

      for (let i = 0; i < results.data._embedded.events.length; i++) {
        venueName.push(results.data._embedded.events[i]._embedded.venues[0].name);
        eventName.push(results.data._embedded.events[i].name);
        venueAddress.push(results.data._embedded.events[i]._embedded.venues[0].address.line1);
        cityName.push(results.data._embedded.events[i]._embedded.venues[0].city.name);
        longitude.push(results.data._embedded.events[i]._embedded.venues[0].location.longitude);
        latitude.push(results.data._embedded.events[i]._embedded.venues[0].location.latitude);

        // console.log(results.data._embedded.events[i]._embedded.venues)

        this.setState({
          venueNames: venueName,
          eventNames: eventName,
          venueAddresses: venueAddress,
          cityNames: cityName,
          longitudes: longitude,
          latitudes: latitude
        });
      }
    })
    // end of getTicketMasterData
  }

    axios({
      method: `GET`,
      url: zomatoURL,
      dataResponse: `json`,
      params: {
        apikey: zomatoKey,
        radius: 1000,
        lat: this.state.longitudes[0],
        long: this.state.latitudes[0],
        start: 1,
        count: 20
      }
    }).then(results => {
      const restaurantName = [];
      const restaurantCuisine = [];
      const restaurantPriceRange = [];
      const restaurantRating = [];
      const restaurantAddress = [];
      const restaurantUrl = [];

      for (let i = 0; i < results.data.nearby_restaurants.length; i++) {
        restaurantName.push(results.data.nearby_restaurants[i].restaurant.name);
        restaurantCuisine.push(results.data.nearby_restaurants[i].restaurant.cuisines);
        restaurantPriceRange.push(results.data.nearby_restaurants[i].restaurant.price_range);
        restaurantRating.push(results.data.nearby_restaurants[i].restaurant.user_rating.aggregate_rating);
        restaurantAddress.push(results.data.nearby_restaurants[i].restaurant.location.address);
        restaurantUrl.push(results.data.nearby_restaurants[i].restaurant.url);

        this.setState({
          restaurantNames: restaurantName,
          restaurantCuisine: restaurantCuisine,
          restaurantPriceRange: restaurantPriceRange,
          restaurantRating: restaurantRating,
          restaurantAddress: restaurantAddress,
          restaurantUrl: restaurantUrl,
        });
      }
    })

    // bring state from Header component to App
    this.submitForm = (Country, City) => {
      this.setState({
        countryUserInput: Country,
        cityUserInput: City,
      })

      // submit user input to the ticket master api call
      this.getTicketMasterData(Country, City);
    }
    // end of componentDidMount
  }

  render() {
    return (
      <div className="App">
        <Header submitForm={this.submitForm} />
      </div>
    );
  }
}

export default App;
