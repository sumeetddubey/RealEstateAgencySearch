/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, {Component} from 'react';
import './placesList.css';
import PlaceItem from '../placeItem/placeItem.js';

class PlacesList extends Component{
    render(){
        return(
            <ul className="places-list">
                {this.props.places.map(function (place, i){
                    return <PlaceItem
                            key={i}
                            place={place}
                        />
                })}
            </ul>
        )
    };
}

export default PlacesList;