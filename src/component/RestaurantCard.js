import react from 'react';
import App from '../App';

class RestaurantCard extends Component {



	render() {
		return (
			<div className="restaurantCard">
				<a href="#"><i>i</i></a>
				<h3>this.props.restaurantName</h3>
				<h4>this.props.restaurantCuisine</h4>
				<h4>this.props.rating</	h4>
				<p>this.props.restaurantAddress</p>
				<p>Distance from Venue</p>
			</div>
		)
	};
};

export default VenueCard