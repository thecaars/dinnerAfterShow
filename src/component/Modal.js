import React, {Component, Fragment} from 'react';
import App from '../App'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const venuePageCSS = {
    background: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100%",
    padding: "100px 0",
    color: "white"
}

const restaurantPageCSS = {
    background: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100%",
    padding: "100px 0",
    color: "white"
}

const confirmationPageCSS = {
    background: "purple",
    position: "absolute",
    top: "30%",
    left: "30%",
    height: "500px",
    width: "500px",

    display: "flex",
}

const confirmedChoicesDiv = {
    width: "50%"
}

const h1CSS = {
    color: "white"
}

class Modal extends Component {
    render(){
        const  {state ={}} = this.props.location;
        const { displayModal, venuePage, confirmationPage, restaurantPage, venueUserInput, restaurantUserInput, ticketMasterData, restaurantData, specificId, restaurantSpecificId, userInputCombination} = state;

        if (displayModal && venuePage) {
            return(
                <> 
                    <div style={venuePageCSS} className="venueModal">
                        <div className="venueModalInnerWrapper">
                            <h2 style={h1CSS}>{ticketMasterData[specificId].name}</h2>
                            <h3>Venue & Address</h3>
                            <p>{ticketMasterData[specificId]._embedded.venues[0].name}</p>
                            <p>{ticketMasterData[specificId]._embedded.venues[0].address.line1} {ticketMasterData[specificId]._embedded.venues[0].postalCode}</p>
                            <a href={ticketMasterData[specificId].url} aria-label="go to ticketmaster page for the current event" target="_blank">buy your ticket here</a>
                        </div>
                        

                        <Link to="/"><button>X</button> </Link>
                    </div> 


                    <Route exact path="/" component={App}></Route>
                </>
            )
        }

        else if (displayModal && restaurantPage) {
            return(
                <>
                    <div style={restaurantPageCSS} key={restaurantData[restaurantSpecificId].restaurant.id} className="restoModal">
                        <Link to="/"><button>X</button></Link>
                        <h1 style={h1CSS}>{restaurantData[restaurantSpecificId].restaurant.name}</h1>
                        <p>{restaurantData[restaurantSpecificId].restaurant.location.address}</p>
                        <p>{restaurantData[restaurantSpecificId].restaurant.price_range}</p>
                        <a href={restaurantData[restaurantSpecificId].restaurant.url}>Link to Zomato Profile</a>
                    </div>

                    <Route exact path="/" component={App}></Route>
                </>
            )
        } 

        else if (displayModal &&  !restaurantPage && !venuePage) {
            return(
                <Fragment>
                    {}
                    <div style={confirmationPageCSS} className="comboModal">
                        <div style={confirmedChoicesDiv} className="venueResult">
                            <img src={userInputCombination[0].images[0].url} alt={userInputCombination[0].name} />
                            <h3>Date & Time</h3>
                            <p>{userInputCombination[0].dates.start.localDate}</p>
                            <p>{userInputCombination[0].dates.start.localTime}</p>
                            <h3>Event Name</h3>
                            <p>{userInputCombination[0].name}</p>
                            <h3>Event Venue</h3>
                            <p>{userInputCombination[0]._embedded.venues[0].name}</p>

                            
                        </div>

                        <div style={confirmedChoicesDiv} className="restoResult">
                            <h3>{userInputCombination[1].restaurant.name}</h3>
                            <p>{userInputCombination[1].restaurant.cuisines}</p>
                            <p>{userInputCombination[1].restaurant.user_rating.aggregate_rating}</p>
                            <p>{userInputCombination[1].restaurant.location.address}</p>
                            <p>distance from event venue</p>
                        </div>

                        
                        {/* This is because we haven't decided yet if they should be able to press [X] and go back to rechoose a restaurant */}
                        {/* <Link to="/"><button>X</button> </Link> */}

                        <button>try again</button>
                        <button>save</button>
                    </div>



                    <Route exact path="/" component={App}></Route>
                </Fragment>
            )
        } 

        else { return (null)}
    }
}

export default Modal;