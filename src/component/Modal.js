import React, {Component, Fragment} from 'react';
import firebase from '../firebase.js';
import App from '../App';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import plateSetting from '../assets/plateSetting.jpg';

const venuePageCSS = {
    background: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100%",
    padding: "100px 0",
    color: "white"
}

const restaurantPageCSS = {
    background: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100%",
    padding: "100px 0",
    color: "white"
}

const confirmationPageCSS = {
    background: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: "0",
    left: "0",
    // height: "100vh",
    width: "100%",
    padding: "20px 0",
    color: "#4c003e"
};

const confirmedChoicesDiv = {
    // width: "50%"
}

const h2CSS = {
    color: "white"
}

class Modal extends Component {

    constructor(){
        super();
        this.state = {
            userName: ''
        }
    }

    handleNameChange = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    submitToFirebase = async (name, combo) => {
        // storing user's name, user's choosen event/restaurant combo to firebase
        const dbRef = firebase.database().ref();

        if (this.state.userName) {
            //loader
            await dbRef.push({
                name: name,
                combo: combo
            });
            //loader off
			alert('Thank you for sharing your combination.');
			window.location.href = "/"
        } 
        else {
            alert('Please enter your name before saving the data.')
        } 
    }
    
    

	resetApp = () => {
		window.location.href = "/"
	}


    render(){
        const  {state ={}} = this.props.location;
        const { displayModal, venuePage, confirmationPage, restaurantPage, venueUserInput, restaurantUserInput, ticketMasterData, restaurantData, specificId, restaurantSpecificId, userInputCombination} = state;

        if (displayModal && venuePage) {
            return(
                <> 
                    <div style={venuePageCSS}>
                        <div className="venueModal wrapper">
                            <h2 style={h2CSS}>{ticketMasterData[specificId].name}</h2>
                            <h3>Venue & Address</h3>
                            <p>{ticketMasterData[specificId]._embedded.venues[0].name}</p>
                            <p>{ticketMasterData[specificId]._embedded.venues[0].address.line1} {ticketMasterData[specificId]._embedded.venues[0].postalCode}</p>
                            <a href={ticketMasterData[specificId].url} className="venueLink" aria-label="go to ticketmaster page for the current event" target="_blank">buy your ticket here</a>
                        </div>
                        <Link to="/"><button className="exitModal"><i className="fas fa-window-close"></i></button></Link>
                    </div> 

                    <Route exact path="/" component={App}></Route>
                </>
            )
        }

        else if (displayModal && restaurantPage) {
            return(
                <>
                    <div style={restaurantPageCSS} key={restaurantData[restaurantSpecificId].restaurant.id}>
                        <div className="restaurantModal wrapper">
                            <h2 style={h2CSS}>{restaurantData[restaurantSpecificId].restaurant.name}</h2>
                            <p>{restaurantData[restaurantSpecificId].restaurant.location.address}</p>
                            <p>Price Range: {restaurantData[restaurantSpecificId].restaurant.price_range}/5</p>
                            <a href={restaurantData[restaurantSpecificId].restaurant.url} className="restaurantLink">Link to Zomato Profile</a>
                        </div>
                        <Link to="/"><button className="exitModal"><i className="fas fa-window-close"></i></button></Link>
                    </div>
                    <Route exact path="/" component={App}></Route>
                </>
            )
        } 

        else if (displayModal &&  !restaurantPage && !venuePage) {
            return(
                <Fragment>
                    {/* {} */}
                    <div style={confirmationPageCSS} className="comboModal">
                        <div className="comboCards">
                            <div style={confirmedChoicesDiv} className="venueResult">
                                <img src={userInputCombination[0].images[0].url} alt={userInputCombination[0].name} />
                                {/* <h3>Date & Time</h3> */}
                                <h3>{userInputCombination[0].name}</h3>
                                <p>{userInputCombination[0]._embedded.venues[0].name}</p>
                                <p>{userInputCombination[0].dates.start.localDate} at {userInputCombination[0].dates.start.localTime}</p>
                                {/* <h3>Event Name</h3> */}
                                {/* <h3>Event Venue</h3> */}
                            </div>

                            <div style={confirmedChoicesDiv} className="restaurantResult">
                                <img src={plateSetting} alt="A dinner plate setting."/>
                                <h3>{userInputCombination[1].restaurant.name}</h3>
                                <p>{userInputCombination[1].restaurant.cuisines}</p>
                                {/* <p>{userInputCombination[1].restaurant.user_rating.aggregate_rating}</p> */}
                                <p>{userInputCombination[1].restaurant.location.address}</p>
                                {/* <p>distance from event venue</p> */}
                            </div>
                        
                            {/* This is because we haven't decided yet if they should be able to press [X] and go back to rechoose a restaurant */}
                            {/* <Link to="/"><button>X</button> </Link> */}
                            <div className="optionToSaveCombo">
                                <div className="userName">
                                    <label htmlFor="userName">Please enter your name to save the data:</label>
                                    <input id="userName" type="text" placeholder="enter your name" onChange={this.handleNameChange}/>
                                </div>
                                <div className="optionToSaveComboButtons">
                                    <div className="saveComboButton">
                                        {/* <button  onClick={() => {this.submitToFirebase(this.state.userName, userInputCombination)}}>save</button> */}
                                        <button onClick={() => { this.submitToFirebase(this.state.userName, userInputCombination) }}>save</button>
                                    </div>
                                    <div className="resetButton">
                                        <button onClick={this.resetApp}>try again</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <Route exact path="/" component={App}></Route>
                </Fragment>
            )
        } 
        else { return (null)}
    }
}

export default Modal;