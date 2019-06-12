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
			selectedCardId: null,
			isVenueCardClicked: false
		}
	}
	
	handleVenueClick = (e) => {
		const targetClassName = e.target.parentElement.className
		console.log(targetClassName)
	
	}

	handleInfoClick = (e) => {
		// console.log(e)
		const clickedVenueId = e.target.parentElement.id
		this.props.getVenueCard(clickedVenueId);
	}


	render() {
		const {venuePage, restaurantPage, ticketMasterData} = this.props

		return (
			<Fragment>
				<ItemsCarousel
					// Carousel configurations
					numberOfCards={ this.props.screenWidth > 980 ? 3 : this.props.screenWidth > 710 ? 2 : 1 }
					gutter={10}
					slidesToScroll={1}
					activePosition={'center'}
					outsideChevron={true}
					showSlither={false}
					firstAndLastGutter={true}
					chevronWidth={30}
					rightChevron={'>'}
					leftChevron={'<'}
					// Active item configurations
					activeItemIndex={this.state.activeItemIndex}
					requestToChangeActive={value => this.setState({ activeItemIndex: value })}
				>
					{this.props.ticketMasterData.map((event, i) => {
						return (
							<Fragment>
								{/* THIS IS MODAL*/}
								<div 
									className={`venueCard ${this.props.selectedCardId === i ? `show` : `hide`}`}
									key={event.id}
									id={i}
									onClick={() => {this.props.changeSelectedCard(i)}} role="button"
									tabIndex="0"
									>
									<Link id={i} to={{
										pathname: venuePage ? '/modal' : undefined,
										state: {
											specificId: i,
											displayModal: true,
											venuePage: venuePage,
											ticketMasterData: ticketMasterData
										}
									}} tabIndex="-1">
										<button className="moreInfo"><i className="fas fa-info-circle"></i></button>
									</Link>
									<div className="imageContainer">
										<img className="cardImage" src={event.images[0].url} alt={event.name} />
									</div>
									<p>{event.dates.start.localDate}</p>
									{/* Event name */}
									<h3>{event.name}</h3>
									{/* Venue name */}
									<p>{event._embedded.venues[0].name}</p>
									<div className="overlay" onClick={this.handleInfoClick}></div>
								</div>
							</Fragment>
						)
					})}
				</ItemsCarousel>
				<Route path="/modal" component={Modal}></Route>
			</Fragment>
		)	
	};
};

export default VenueCard