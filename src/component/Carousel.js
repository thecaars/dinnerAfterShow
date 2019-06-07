import React, {Component} from 'react';
import VenueCard from './VenueCard.js';
import RestaurantCard from './RestaurantCard.js';

class Carousel extends Component {
   render() {
      return (
         <div className="carouselContainer wrapper">
            {this.props.venuePage 
               ? <VenueCard 
                  ticketMasterData={this.props.ticketMasterData}
                  getVenueCard={this.props.getVenueCard} 
               />
               : <RestaurantCard 
                  restaurantData={this.props.restaurantData}
                  getRestaurantCard={this.props.getRestaurantCard} 
               />
            }
         </div>
      )
   }
}

export default Carousel