import React, { Component } from 'react';
import styled from 'styled-components';

const Tracker = styled.div`
	width: 50%;
	height: 20px;
	margin: 15px auto;
	background: white;
	border-radius: 10px;
`;

const ProgressInTracker = styled.div`
   width: ${props => props.percentage}%;
   height: 100%;
   background: #084c61;
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

export default ProgressBar