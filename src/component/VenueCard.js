import React, {Component} from 'react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';

class VenueCard extends Component {
	
	handleVenueClick = (e) => {
		console.log(e)
		this.props.getVenueCard(e.target.parentElement.id);
	};

	componentWillMount() {
		this.setState({
			children: [],
			activeItemIndex: 0,
		});
	}

	createChildren = n => range(n).map(i => <div key={i} style={{ "padding": "0 60px", "maxWidth": "100vw", "margin": "0 auto" }}>{i}</div>);

	changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

	render() {
		return (
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
						<img src={event.images[0].url} alt={event.name} />
						{/* THIS IS MODAL -->*/}   {/* <a href="#"><i>i</i></a> */}
						<p>{event.dates.start.localDate}</p>
						{/* Event name */}
						<h3>{event.name}</h3>
						{/* Venue name */}
						<h4>{event._embedded.venues[0].name}</h4>
					</div>
				)
			})}
		</ItemsCarousel>
)	
};
};

export default VenueCard