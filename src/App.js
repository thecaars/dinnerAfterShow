import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
		constructor() {
    super();
    this.state = {
      venueNames: [],
      eventNames: [],
      venueAddresses: [],
      cityNames: [],
      longitudes: [],
      latitudes: [],
      restaurantNames: [],
      dateTime: ''
    };
  }
  
  componentDidMount() {
  const ticketMasterURL = `https://app.ticketmaster.com/discovery/v2/events.json`;
  const tickerMasterKey = `OAKSlXdTBwnYydjVVSFhbh0MrAqawD6u`;
  const zomatoURL = `https://developers.zomato.com/api/v2.1/geocode`;
  const zomatoKey = `105eeb0d2c69617a061003c1a4f82e13`;
  const dateTime = Date();
  console.log(dateTime)

  axios({
    method: `GET`,
    url: ticketMasterURL,
    dataRespons: `json`,
    params: {
      apikey: tickerMasterKey,
      city: `toronto`,
      country: `ca`,
      sort: `date,asc`,
      startDateTime: dateTime
    }
  }).then(results => {
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

      console.log(results.data._embedded.events[i]._embedded.venues)

      this.setState({
        venueNames: venueName,
        eventNames: eventName,
        venueAddresses: venueAddress,
        cityNames: cityName,
        longitudes: longitude,
        latitudes: latitude
      });
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

      for (let i = 0; i < results.data.nearby_restaurants.length; i++) {
        restaurantName.push(results.data.nearby_restaurants[i].restaurant.name);
        
        console.log(results.data.nearby_restaurants[i].restaurant.name);

        this.setState({
          restaurantNames: restaurantName
        });
      }
    });
  });  
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
