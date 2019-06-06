import react from 'react';
import App from '../App';

class VenueCard extends Component {



	render() {
		return(
			<div className="venueCard">
				<img src="" alt=""/>
				<a href="#"><i>i</i></a>
				<p>this.props.date</p>
				<h3>this.props.eventName</h3>
				<h4>this.props.venueName</h4>
			</div>
		)
	};
};

export default VenueCard