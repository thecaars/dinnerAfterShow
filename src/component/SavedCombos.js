import React, {Component} from 'react';
import firebase from '../firebase.js';

class SavedCombos extends Component {
    constructor() {
        super();

        this.state = {
            savedCombos: []
        }
    }
    
    componentDidMount() {
        const dbRef = firebase.database().ref();

        dbRef.on('value', (response) => {
            const valueArray = response.val();

            const newSaved = [];

            for (let item in valueArray) {
                newSaved.push({
                    key: item,
                    combo: valueArray[item],
                });

                this.setState({
                    savedCombos: newSaved
                })
            }
        });
    }

    render() {
        return(
            <div>
                <h2>Shared Resutls</h2>
                {
                    this.state.savedCombos.map((data) => {
                        {/* const eventImg = data.combo[0].images
                        console.log(data.combo[0]);
                        console.log(data.combo[1].restaurant); */}

                        return(
                            <div key={data.key}>
                                <div className="event">
                                    <h2>{data.combo[0].name}</h2>
                                </div>

                                <div className="restaurant">
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SavedCombos;