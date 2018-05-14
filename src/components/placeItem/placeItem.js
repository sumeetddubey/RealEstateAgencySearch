/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, {Component} from 'react';

class PlaceItem extends Component{
    render(){
        const distance = (this.props.place.distance/1609.34).toFixed(2);

        return(
            <li>{this.props.place.name} {distance} miles</li>
        )
    }
}

export default PlaceItem;