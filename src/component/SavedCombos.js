import React, {Component} from 'react';
import firebase from '../firebase.js';

class SavedCombos extends Component {
    constructor() {
        super();

        this.state = {
            savedCombos: []
        }
    }
    
    componentDidMount() {
        const dbRef = firebase.database().ref();

        dbRef.on('value', (response) => {
            const valueArray = response.val();

            const newSaved = [];

            for (let item in valueArray) {
                newSaved.push({
                    key: item,
                    combo: valueArray[item],
                });

                this.setState({
                    savedCombos: newSaved
                })
            }
        });

    }
    
    removeCombo = (comboId) => {
        const dbRefCombo = firebase.database().ref(comboId);

        dbRefCombo.remove();
    }

    render() {
        return(
            <div className="combo">
                <h2>Shared Resutls</h2>
                {
                    this.state.savedCombos.map((data) => {
                        const userName = data.combo.name;
                        const event = data.combo[0];
                        const eventDate = event.dates.start;
                        const eventVenue = event._embedded.venues[0];
                        const resto = data.combo[1].restaurant;

                        return(
                            <div key={data.key} className="singleCombo">
                                <h2>{userName}</h2>
                                <div className="event">
                                    <img src={event.images[0].url} alt={event.name}/>
                                    <p>{eventDate.localDate} {eventDate.localTime}</p>
                                    <h3>{event.name}</h3>
                                    <p>{eventVenue.name}</p>
                                    <a href={eventVenue.url} aria-label="go to ticketmasker page for the specific venue where tickets are sold.">get your ticket</a>
                                </div>

                                <div className="restaurant">
                                    <img src={resto.featured_image} alt={resto.name}/>
                                    <h3>{resto.name}</h3>
                                    <p>{resto.cuisines}</p>
                                    <div className="priceNRating">
                                        <p>{resto.price_range}/5</p>
                                        <p>{resto.user_rating.aggregaterating}/5</p>
                                    </div>
                                    <a href={resto.url}>zomato profile</a>
                                </div>

                                <button onClick={() => { this.removeCombo(data.key) }}>remove combo</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SavedCombos;