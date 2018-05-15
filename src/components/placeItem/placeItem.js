/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './placeItem.css';

class PlaceItem extends Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(place){
        this.props.handleSelect(place);
    }

    isOpen(place){
        if(!place.opening_hours)
            return false;
        return(place.opening_hours.open_now);
    }

    getRating(place){
        if(!place.rating)
            return '';
        return 'Rating: '  +place.rating + '/5';
    }

    /*
    converts from meters to miles
     */
    toMiles(val){
        return (val/1609.34).toFixed(2)
    }

    render(){
        const place = this.props.place;
        const distance = this.toMiles(place.distance);

        return(
            <a onClick={() => this.handleSelect(place)} className="list-group-item list-group-item-action flex-column align-items-start mb-1 pointer">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{place.name}</h5>
                    <small>{distance} miles</small>
                </div>
                <p>{place.vicinity}</p>
                <span className={this.isOpen(place) ? 'badge badge-primary' : 'badge badge-light'}>{this.isOpen(place) ? 'Open Now' : 'Closed'}</span>
                <span className="ml-4">{this.getRating(place)}</span>
            </a>
        )
    }
}

PlaceItem.propTypes={
    place: PropTypes.object,
    handleSelect: PropTypes.func
};

PlaceItem.defaultProps = {
    place: {}
};

export default PlaceItem;