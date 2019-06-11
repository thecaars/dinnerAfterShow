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
	

	// handleVenueClick = (e) => {
	// 	if (this.state.selectedCardId == e.target.parentElement.id){
	// 		this.handleInfoClick(e)
	// 		e.target.parentElement.className = `venueCard show`
	// 		this.setState({
	// 			selectedCardId: e.target.parentElement.id
	// 		})
	// 	}
	// 	else if (this.state.selectedCardId == e.target.parentElement.id){

	// 	}
	// }

	
	handleVenueClick = (e) => {
		const targetClassName = e.target.parentElement.className
		console.log(targetClassName)
		// if (e.target.parentElement.className === `venueCard hide`) {
		// 	// this.handleInfoClick(e)
		// 	console.log(this.card.current)
		// 	// this.setState({
		// 	// 	selectedCard: !this.state.selectedCard
		// 	// })

		// 	// setTimeout(function(e) {
		// 	// 	// console.log("this is just e ",e)
		// 	// 	// console.log("e.target", e.target)
		// 	// 	e.target.parentElement.className = `venueCard show`
		// 	// }, 1000)
		
		// }
		// else if(e.target.parentElement.className === `venueCard show`){
		// 	this.handleInfoClick(e)
		// 	// this.setState({
		// 	// 	selectedCard: false
		// 	// })
		// }

	}

	// handleVenueClick = (e) => {
	// 	if (this.state.selectedCard && !this.state.isVenueCardClicked) {
	// 		this.handleInfoClick(e)
	// 		e.target.parentElement.className = `venueCard show`
	// 		this.setState({
	// 			selectedCard: !this.state.selectedCard,
	// 			isVenueCardClicked: true
	// 		})
	// 	} else if (!this.state.selectedCard) {
	// 		// need to check IF The venueCard has the class name of show in it, then give it JUST the venue card property AND revert ISVENUECARCLICKED to true 
	// 		if( e.target.parentElement.className === `venueCard show`) {
	// 				e.target.parentElement.className = `venueCard`
	// 				this.setState({
	// 					selectedCard: !this.state.selectedCard,
	// 					isVenueCardClicked: false
	// 				})
	// 		} 
			
	// 	}

	// 	this.setState({
	// 	})

	// };

	handleInfoClick = (e) => {
		console.log(e)
		const clickedVenueId = e.target.parentElement.id
		this.props.getVenueCard(clickedVenueId);
	}

	// createChildren = n => range(n).map(i => <div key={i} style={{ "padding": "0 60px", "maxWidth": "100vw", "margin": "0 auto" }}>{i}</div>);

	// changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

	render() {
		const {venuePage, restaurantPage, ticketMasterData} = this.props
		// const selectedCard = this.state.selectedCard ? 'show' : 'hide';
		// const selectedTernary = this.props.selectedCardId ===  ? `hide` : `hide`
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
							<Fragment>
								{/* THIS OPENS A MODAL*/}
								<Link id={i} to={{
									pathname: venuePage ? '/modal' : undefined,
									state: {
										specificId: i,
										displayModal: true,
										venuePage: venuePage,
										ticketMasterData: ticketMasterData
									}
								}}>
									<button onClick={this.handleInfoClick} className="moreInfo"><i className="fas fa-info-circle"></i></button>
								</Link>

								<div className={`venueCard ${this.props.selectedCardId === i ? `show` : `hide`}`} key={event.id} id={i} onClick={()=>{this.props.changeSelectedCard(i)}} role="button">
									
									
									<div className="imageContainer">
										<img className="cardImage" src={event.images[0].url} alt={event.name} />
									</div>
									<p>{event.dates.start.localDate}</p>
									{/* Event name */}
									<h3>{event.name}</h3>
									{/* Venue name */}
									<p>{event._embedded.venues[0].name}</p>
									<div className="overlay"></div>
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