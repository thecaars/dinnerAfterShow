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
                {/* <h2>Shared Resutls</h2>
                {
                    this.state.savedCombos.map((data) => {
                        const eventInfo = data.combo[0];
                        const eventVenueInfo = eventInfo._embedded.venues[0];

                        const restoInfo = data.combo[1].restaurant;

                        return(
                            <div key={data.key}>
                                <div className="event">
                                    <h2>{data.combo[0].name}</h2>
                                    <img src={eventInfo.images[0].url} alt={data.combo[0].name}/>
                                    <p>event type: {eventInfo.classifications[0].segment.name}</p>
                                    <p>address: {eventVenueInfo.address.line1} {eventVenueInfo.postalCode}</p>
                                    <a href={eventInfo.url} aria-label="go to ticketmaster page for the current event" target="_blank">book your ticket</a>
                                </div>

                                <div className="restaurant">
                                    <h2>{restoInfo.name}</h2>
                                    <img src={restoInfo.featured_image} alt={restoInfo.name}/>
                                    <p>cuisine type: {restoInfo.cuisines}</p>
                                    <p>price range: {restoInfo.price_range} / 5</p>
                                    <p>rating: {restoInfo.user_rating.aggregate_rating} / 5</p>
                                    <a href={restoInfo.url} aria-label="go to zomato page for more information" target="_blank">more info</a>                                    
                                </div>

                                <button onClick={() => { this.removeCombo(data.key) }}>remove combo</button>
                            </div>
                        )
                    })
                } */}
            </div>
        )
    }
}

export default SavedCombos;