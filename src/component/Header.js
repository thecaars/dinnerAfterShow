import React, { Component } from 'react';
import axios from 'axios';
import DynamicMainDisplay from './DynamicMainDisplay';
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
            ticketMasterData: []
        }
    }

    componentDidMount(){
        const ticketMasterURL = `https://app.ticketmaster.com/discovery/v2/events.json`;
        const ticketMasterKey = `OAKSlXdTBwnYydjVVSFhbh0MrAqawD6u`;
    
        // Formatting Date for ticketmaster api call
        const newDate = new Date();
        const year = newDate.getFullYear();
        const newMonth = newDate.getMonth();
        const newDay = newDate.getDay();
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
                    startDateTime: this.state.date
                }
            }).then(results => {

                this.setState({
                    ticketMasterData: results.data._embedded.events
                })



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
        } // end of getTicketMasterData
    }  // end of componentDidMount


    handleOnChange = (e) => {
        if (e.target.id === "country") {
            this.setState({
                userCountry: e.target.value
            })
        } else if (e.target.id === "city") {
            this.setState({
                userCity: e.target.value
            })
        }
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        // this.props.submitForm(this.state.userCountry, this.state.userCity);
        // this.setState({
        //     userCountry: country,
        //     userCity: city,
        //   })
        this.getTicketMasterData(this.state.userCountry, this.state.userCity) 
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Dinner After Show</h1>
                    <p>Input your country and city to see what upcoming events are happening around you.</p>

                    <form onSubmit={this.handleOnSubmit}>
                        <div className="input">
                            <div className="selectInput">
                                <label htmlFor="country"></label>
                                <select id="country" name="country" onChange={this.handleOnChange}>
                                    <option value="" readOnly>Country</option>
                                    <option value="" readOnly>Country</option>
                                    <option value="AU">Australia</option>
                                    <option value="BR">Brazil</option>
                                    <option value="CA">Canada</option>
                                    <option value="CL">Chile</option>
                                    <option value="CZ">Czech Republic</option>
                                    <option value="IN">India</option>
                                    <option value="IE">Ireland</option>
                                    <option value="IT">Italy</option>
                                    <option value="LB">Lebanon</option>
                                    <option value="MY">Malaysia</option>
                                    <option value="NZ">New Zealand</option>
                                    <option value="PL">Poland</option>
                                    <option value="PT">Portugal</option>
                                    <option value="SG">Singapore</option>
                                    <option value="SK">Slovakia</option>
                                    <option value="ZA">South Africa</option>
                                    <option value="TR">Turkey</option>
                                    <option value="AE">United Arab Emirates</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="US">United States</option>
                                </select>
                            </div>

                            <div className="textInput">
                                <label htmlFor="city"></label>
                                <input id="city" type="text" onChange={this.handleOnChange} />
                            </div>
                        </div>

                        <div className="submitButton">
                            <label htmlFor="submitButton">Begin your search</label>
                            <button id="submitButton" type="submit">begin</button>
                        </div>

                        <div className="communitySuggestionPage">
                            <label htmlFor="communitySuggestion">See all posted results</label>
                            <button id="communitySuggestion">In a hurry? See other results</button>
                        </div>
                    </form>
                </header>
                <DynamicMainDisplay ticketMasterData={this.state.ticketMasterData}/>
            </div>
        ) // end of return()
    } // end of render()
}

export default Header;