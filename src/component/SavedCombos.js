import React, {Component} from 'react';
import firebase from '../firebase.js';
import plateSetting from '../assets/plateSetting.jpg';

class SavedCombos extends Component {
    createNewCombo = () => {
			window.location.href = "/"
    }
    
    removeCombo = (comboId) => {
			const dbRefCombo = firebase.database().ref(comboId);

			dbRefCombo.remove();
				
			window.location.href = "/"
    }

    render() {
        return(
            <div id="combo" className="savedCombos">
                <h2>Shared Results</h2>
                <label htmlFor="makeYourCombo" className="visuallyHidden">Create your own combo</label>
								<button id="createNewCombo" className="createNewCombo" onClick={this.createNewCombo}>Create New Combo</button>

                {
					this.props.savedCombos.map((data) => {
                        const userName = data.combo.name;
                        const event = data.combo.combo[0];
                        const eventDate = event.dates.start;
                        const eventVenue = event._embedded.venues[0];
                        const resto = data.combo.combo[1].restaurant;

                        return(
							<div key={data.key} className="savedCombosOuterContainer">
								<h3>{userName}'s Combo</h3>
								<div className="savedCombosInnerContainer">
										<div className="eventComboContainer comboContainer">
												<div className="imageContainer">
													<img src={event.images[0].url} alt={event.name}/>
												</div>
												<h3>{event.name}</h3>
												<p>{eventDate.localDate} {eventDate.localTime}</p>
												<p>{eventVenue.name}</p>
												<a href={eventVenue.url} aria-label="go to ticketmasker page for the specific venue where tickets are sold.">get your ticket</a>
										</div>
									<div className="restaurantComboContainer comboContainer">
											<div className="imageContainer">
											<img src={plateSetting} alt="A dinner place setting." />
											</div>
												<h3>{resto.name}</h3>
												<p>{resto.cuisines}</p>
												<div className="priceNRating">
														<p>{resto.price_range}/5</p>
														<p>{resto.user_rating.aggregaterating}</p>
												</div>
												<a href={resto.url}>zomato profile</a>
										</div>
								</div>
								<button className="removeButton" onClick={() => { this.removeCombo(data.key) }}>remove combo</button>
							</div>								
                        )
                    })
                }
            </div>
        )
    }
}

export default SavedCombos;