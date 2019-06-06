import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
  } from 'react-router-dom'


import App from '../App'

const venuePageCSS = {
    background: "black",
    position: "absolute",
    top: "30%",
    left: "30%",
    height: "500px",
    width: "500px",
}

const restaurantPageCSS = {
    background: "green",
    position: "absolute",
    top: "30%",
    left: "30%",
    height: "500px",
    width: "500px",
}

const confirmationPageCSS = {
    background: "purple",
    position: "absolute",
    top: "30%",
    left: "30%",
    height: "500px",
    width: "500px",
}

class Modal extends Component {
    
    render(){
        const  {state ={}} = this.props.location;
        const { displayModal, venuePage, confirmationPage, restaurantPage, venueUserInput, restaurantUserInput} = state;

        
        if (displayModal && venuePage) {
            return(
                <> 
                    <div style={venuePageCSS}>
                    <Link to="/"><button>X</button> </Link>
                    </div>            
                    <Route exact path="/" component={App}></Route>
                </>
            )
        }
       


        else if (displayModal && restaurantPage) {
            return(
                <>
                    <div style={restaurantPageCSS}>
                       <Link to="/"><button>X</button> </Link>
                    </div>
                    <Route exact path="/" component={App}></Route>
                </>
       )
       } 
       
       //// WHY THE FUCK --> venueUserInput[0] == undefined, or even nothing if I put an bject in it (remember i changed the value )
       else if (displayModal && confirmationPage && venueUserInput[0] && restaurantUserInput[0]) {
            return(
                <>
                    <div style={confirmationPageCSS}>
                    <Link to="/"><button>X</button> </Link>
                    </div>
                    <Route exact path="/" component={App}></Route>
                </>
            )
        } 
       
       
       
       
       
       else { return (null)}
   


    }
}

export default Modal