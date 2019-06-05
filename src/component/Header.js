import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <h1>Dinner After Show</h1>
                <p>Input your country and city to see what upcoming events are happening around you.</p>

                <form onSubmit={this.props.submitForm}>
                    <div className="input">
                        <div className="selectInput">
                            <label htmlFor="country"></label>
                            <select id="country" name="country" onChange={this.props.handleUserCountryChange}>
                                <option value="" readonly>Country</option>
                                <option value="CA">Canada</option>
                            </select>
                        </div>

                        <div className="textInput">
                            <label htmlFor="city"></label>
                            <input id="city" type="text" onChange={this.props.handleUserCityChange} />
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