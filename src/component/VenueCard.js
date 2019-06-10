import React, {Component, Fragment} from 'react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import Modal from './Modal.js';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'


class VenueCard extends Component {
	constructor() {
		super();
		this.state = {
			children: [],
			activeItemIndex: 0
		}
	}
	
	handleVenueClick = (e) => {
		this.props.getVenueCard(e.target.parentElement.id);
	};

	// createChildren = n => range(n).map(i => <div key={i} style={{ "padding": "0 60px", "maxWidth": "100vw", "margin": "0 auto" }}>{i}</div>);

	// changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

	render() {
		const {venuePage, restaurantPage, ticketMasterData} = this.props
		return (
			<Fragment>
				<ItemsCarousel
					// Carousel configurations
					numberOfCards={3}
					gutter={10}
					slidesToScroll={1}
					activePosition={'center'}
					outsideChevron={true}
					showSlither={false}
					firstAndLastGutter={true}
					chevronWidth={50}
					rightChevron={'>'}
					leftChevron={'<'}
					// Active item configurations
					activeItemIndex={this.state.activeItemIndex}
					requestToChangeActive={value => this.setState({ activeItemIndex: value })}
				>
					{this.props.ticketMasterData.map((event, i) => {
						return (
							<div className="venueCard" key={event.id} id={i} onClick={this.handleVenueClick} role="button">
								{/* THIS IS MODAL*/}
								<Link id={i} to={{
									pathname: venuePage ? '/modal' : undefined, 
									state: {
										specificId: i,
										displayModal: true, 
										venuePage: venuePage,
										ticketMasterData: ticketMasterData
									}
								}}>
									<button onClick={this.handleVenueClick} className="moreInfo"><i className="fas fa-info-circle"></i></button>
								</Link>
								<img src={event.images[0].url} alt={event.name} />
								<p>{event.dates.start.localDate}</p>
								{/* Event name */}
								<h3>{event.name}</h3>
								{/* Venue name */}
								<h4>{event._embedded.venues[0].name}</h4>
							</div>
						)
					})}
				</ItemsCarousel>
				<Route path="/modal" component={Modal}></Route>
			</Fragment>
		)	
	};
};

export default VenueCard