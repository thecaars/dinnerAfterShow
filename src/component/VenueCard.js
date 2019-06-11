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
			activeItemIndex: 0,
			selectedCard: true,
		}
	}
	
	handleVenueClick = (e) => {
		const clickedVenueId = e.target.parentElement.id
		this.props.getVenueCard(clickedVenueId);

		if (this.state.selectedCard) {
			e.target.parentElement.className = `venueCard show`
		} else if (!this.state.selectedCard) {
			e.target.parentElement.className = `venueCard hide`
		}
		this.setState({
			selectedCard: !this.state.selectedCard
		})
	};

	// createChildren = n => range(n).map(i => <div key={i} style={{ "padding": "0 60px", "maxWidth": "100vw", "margin": "0 auto" }}>{i}</div>);

	// changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

	render() {
		const {venuePage, restaurantPage, ticketMasterData} = this.props
		// const selectedCard = this.state.selectedCard ? 'show' : 'hide';

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
							<div className={`venueCard`}key={event.id} id={i} onClick={this.handleVenueClick} role="button">
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
								<div className="imageContainer">
									<img className="cardImage" src={event.images[0].url} alt={event.name} />
								</div>
								<p>{event.dates.start.localDate}</p>
								{/* Event name */}
								<h3>{event.name}</h3>
								{/* Venue name */}
								<p>{event._embedded.venues[0].name}</p>
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