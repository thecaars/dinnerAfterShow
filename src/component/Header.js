import React, { Component } from 'react';

class Header extends Component {
    constructor() {
        super();

        this.state = {
            userCountry: "",
            userCity: ""
        }
    }

    handleOnChange = (e) => {
        if (e.target.id === "country") {
            this.setState({
                userCountry: e.target.value
            })
        } else if (e.target.id === "city") {
            this.setState({
                userCity: e.target.value
            })
        }
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.submitForm(this.state.userCountry, this.state.userCity);

    }

    render() {
        return (
            <header>
                <h1>Dinner After Show</h1>
                <p>Input your country and city to see what upcoming events are happening around you.</p>

                <form onSubmit={this.handleOnSubmit}>
                    <div className="input">
                        <div className="selectInput">
                            <label htmlFor="country"></label>
                            <select id="country" name="country" onChange={this.handleOnChange}>
                                <option value="" readOnly>Country</option>
                                <option value="" readOnly>Country</option>
                                <option value="AU">Australia</option>
                                <option value="BR">Brazil</option>
                                <option value="CA">Canada</option>
                                <option value="CL">Chile</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="IN">India</option>
                                <option value="IE">Ireland</option>
                                <option value="IT">Italy</option>
                                <option value="LB">Lebanon</option>
                                <option value="MY">Malaysia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="SG">Singapore</option>
                                <option value="SK">Slovakia</option>
                                <option value="ZA">South Africa</option>
                                <option value="TR">Turkey</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="UK">United Kingdom</option>
                                <option value="US">United States</option>
                            </select>
                        </div>

                        <div className="textInput">
                            <label htmlFor="city"></label>
                            <input id="city" type="text" onChange={this.handleOnChange} />
                        </div>
                    </div>

                    <div className="submitButton">
                        <label htmlFor="submitButton">Begin your search</label>
                        <button id="submitButton" type="submit">begin</button>
                    </div>

                    <div className="communitySuggestionPage">
                        <label htmlFor="communitySuggestion">See all posted results</label>
                        <button id="communitySuggestion">In a hurry? See other results</button>
                    </div>
                </form>
            </header>
        )
    }
}

export default Header;