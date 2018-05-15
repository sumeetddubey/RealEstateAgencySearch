/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, {Component} from 'react';

class PlaceItem extends Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(place){
        this.props.handleSelect(place);
    }

    render(){
        const place = this.props.place;
        const distance = (place.distance/1609.34).toFixed(2);

        return(
            <a href="#" onClick={() => this.handleSelect(place)} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{place.name}</h5>
                    <small>{distance} miles</small>
                </div>
                <p className="mb-1">{place.vicinity}</p>
            </a>
            //<li>{this.props.place.name} {distance} miles</li>
        )
    }
}

export default PlaceItem;