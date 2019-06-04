import React, { Component } from 'react';

class Date extends Component {

	componentDidMount() {
		const date = new Date();
		const year = date.getFullYear();
		const monthFunction = date.getMonth();
		const dayFunction = date.getDay();
		let month = (monthFunction < 10) ? "0" + monthFunction : monthFunction;
		let day = (dayFunction < 10) ? "0" + dayFunction : dayFunction;
		console.log(year, month, day)
	}
}

render() {
	return (
		<div>
			<App callbackFromParent={this.myCallback} />
		</div>
	)
}
export default Date;
