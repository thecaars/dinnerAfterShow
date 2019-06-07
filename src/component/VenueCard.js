import React, {Component} from 'react';
import App from '../App';

class VenueCard extends Component {

	constructor() {
		super();
	}

	handleClick = (e) => {
		this.props.getVenueCard(e.target.parentElement.id);

	}

	

	render() {

		const {ticketMasterData} = this.props

		const venueCards = ticketMasterData.map((event, i) => {
			return(
				<div className="venueCard" key={event.id} id={i} onClick={this.handleClick} role="button">
					<img src={event.images[0].url} alt={event.name}/>
					 {/* THIS IS MODAL -->*/}   {/* <a href="#"><i>i</i></a> */}
					<p>{event.dates.start.localDate}</p>
					{/* Event name */}
					<h3>{event.name}</h3>
					{/* Venue name */}
					<h4>{event._embedded.venues[0].name}</h4>
				</div>
		
			)
		})
		return(
			<div>
				{venueCards}
			</div>	
		)
	};
};

export default VenueCard