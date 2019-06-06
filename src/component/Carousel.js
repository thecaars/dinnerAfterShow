import React, {Component} from 'react';
import ItemsCarousel from 'react-items-carousel';
import VenueCard from './VenueCard.js';
import range from 'lodash/range';

class Carousel extends Component {

   componentWillMount() {
      this.setState({
         children: [],
         activeItemIndex: 0,
      });
   }



   createChildren = n => range(n).map(i => <div key={i} style={{ "padding": "0 60px", "maxWidth": "100vw", "margin": "0 auto" }}>{i}</div>);

   changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

   render() {
      const {
         activeItemIndex,
         children,
      } = this.state; 

      return (
         <div className="carouselContainer wrapper">
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

               {/* map through venue and restaurant cards here */}
               {/* this should be Components wrapped in if statements 
               These components should also have the following information passed as props down:
               LIST OF PROPS NEEDED TO PASS TO THE CARDS: venuePage, confirmationPage, restaurantPage, venueUserInput, restaurantUserInput  */}
               {Array.from(new Array(20)).map((_, i) =>
                  <div
                     key={i}
                     style={{
                        height: 400,
                        width: 325,
                        background: 'black'
                     }}
                  />
               )}
               
              


            </ItemsCarousel>

            <VenueCard ticketMasterData={this.props.ticketMasterData}/>
            {/* <div className="cardContainer">
               <VenueCard />
            </div> */}

         </div>
      )
   }
}

export default Carousel