/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, {Component} from 'react';
import './placesList.css';
import PlaceItem from '../placeItem/placeItem.js';

class PlacesList extends Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(place){
        this.props.selectPlace(place);
    }

    render(){
        return(
            <div className="list-group">
                {this.props.places.map((place, i) => {
                    return <PlaceItem
                            key={i}
                            place={place}
                            handleSelect={this.handleSelect}
                        />
                })}
            </div>
        )
    };
}

export default PlacesList;