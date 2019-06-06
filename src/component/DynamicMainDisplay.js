import React, {Component} from 'react';
import App from '../App'
import Modal from './Modal.js';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
  } from 'react-router-dom'


const venueCARD = {
    height: "100px",
    width: "100px",
    background: "black"
}

const restaurantCARD= {
    height: "100px",
    width: "100px",
    background: "red"
}

const combinationCARD= {
    height: "100px",
    width: "100px",
    background: "blue"
}



class DynamicMainDisplay extends Component {
    
    
    
    
    render(){
    // REMEMBER: venuePage in App.js = FALSE 
    // REMEMBER: modalPage in App.js = FALSE 
    // REMEMBER: confirmationPage in App.js = TRUE 
    const {venuePage, confirmationPage, restaurantPage, modalPage, venueUserInput, restaurantUserInput} = this.props

        return(
        <div>
            <div>
                <h1>DynamicMainDisplay</h1>

                <div style={venueCARD}>
                    <Link to={{
                        pathname: venuePage ? '/modal' : undefined, 
                        state: {displayModal: true, venuePage: venuePage} }}>
                    <button>Click here</button>
                    </Link></div>

                <div style={restaurantCARD}>
                    <Link to={{
                        pathname: restaurantPage ? '/modal' : undefined, 
                        state: {displayModal: true, restaurantPage: restaurantPage} }}>
                    <button>Click here</button>
                    </Link></div>

                <div style={combinationCARD}>
                    <Link to={{
                        pathname: confirmationPage ? '/modal' : undefined, 
                        state: {displayModal: true, confirmationPage: confirmationPage, venueUserInput: venueUserInput, restaurantUserInput: restaurantUserInput} }}>
                    <button>Click here</button>
                    </Link></div>


                {/* <div style={testDiv1}><Link to={{pathname: '/modal', state: {displayModal: true, venuePage: venuePage} }}> <button>Click here</button>  </Link></div> */}
                {/* <div style={testDiv2}><Link to={{pathname: '/modal', state: {displayModal: true, confirmationPage: confirmationPage} }}><button>Click here</button></Link></div> */}
            </div>



             <Route path="/modal" component={Modal}></Route>
            
        </div>
        )
    }
}

export default DynamicMainDisplay