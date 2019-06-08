import React, {Component} from 'react';
import App from '../App'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

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

const h1CSS = {
    color: "white"
}

class Modal extends Component {
    render(){
        const  {state ={}} = this.props.location;
        const { displayModal, venuePage, confirmationPage, restaurantPage, venueUserInput, restaurantUserInput, ticketMasterData, restaurantData, specificId, restaurantSpecificId} = state;

        if (displayModal && venuePage) {
            return(
                <> 
                    <div style={venuePageCSS}>
                        <h1 style={h1CSS}>{ticketMasterData[specificId].name}</h1>
                    <Link to="/"><button>X</button> </Link>
                    </div> 


                    <Route exact path="/" component={App}></Route>
                </>
            )
        }
  
        else if (displayModal && restaurantPage) {
            return(
                <>
                    <div style={restaurantPageCSS} key={restaurantData[restaurantSpecificId].restaurant.id}>
                       <Link to="/"><button>X</button></Link>
                    <h1 style={h1CSS}>{restaurantData[restaurantSpecificId].restaurant.name}</h1>
                    </div>
                    <Route exact path="/" component={App}></Route>
                </>
            )
       } 
       
    //    //// WHY THE FUCK --> venueUserInput[0] == undefined, or even nothing if I put an bject in it (remember i changed the value )
    //    else if (displayModal && confirmationPage && venueUserInput[0] && restaurantUserInput[0]) {
    //         return(
    //             <>
    //                 <div style={confirmationPageCSS}>
    //                 <Link to="/"><button>X</button> </Link>
    //                 </div>
    //                 <Route exact path="/" component={App}></Route>
    //             </>
    //         )
    //     } 

       else { return (null)}
    }
}

export default Modal