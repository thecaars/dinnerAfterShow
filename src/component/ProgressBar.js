import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Tracker = styled.div`
	width: 50%;
	height: 20px;
	margin: 15px auto;
	background: #222;
	border-radius: 10px;
	box-shadow: inset 0 0 5px #000;
`;

const ProgressInTracker = styled.div`
   width: ${props => props.percentage}%;
   height: 100%;
   background: #dfe132;
   border-radius: 8px;
   transition: width 0.3s ease-in;
`;

class ProgressBar extends Component {

   percentageLimits = (min, value, max) => {
      return Math.min(Math.max(min, value), max);
   }
   render() {
      return (
         <Tracker>
            <ProgressInTracker 
               percentage={this.percentageLimits(0, this.props.percentage, 100)}
            />
         </Tracker>
      )
   }
} // end of ProgressBar extends Component

ProgressBar.propTypes = {
   percentage: PropTypes.number,
}

export default ProgressBar