/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import './search.css';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            address1: '',
            address2: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAddress1 = this.handleChangeAddress1.bind(this);
        this.handleChangeAddress2 = this.handleChangeAddress2.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        if(!this.state.address1 || !this.state.address2){
            alert('Please enter 2 addresses');
            return;
        }
        let addresses = [];
        geocodeByAddress(this.state.address1)
            .then(results => {
                addresses.push(results[0]);
                geocodeByAddress(this.state.address2)
                    .then(results => {
                        addresses.push(results[0]);
                        this.props.onSearch(addresses);
                    })
                    .catch(error => console.error('Error', error));
            })
            .catch(error => console.error('Error', error));


    }

    handleChangeAddress1 = (address) => {
        this.setState({ address1: address })
    };

    handleChangeAddress2 = (address) => {
        this.setState({ address2: address })
    };

    render() {
        const renderFunction = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
            <div className="form-group">
                <input className="form-control" {...getInputProps()} />
                <div className="autocomplete-dropdown-container">
                    {suggestions.map(suggestion => (
                        <div {...getSuggestionItemProps(suggestion)}>
                            <span className="autocomplete-dropdown-item">{suggestion.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        );

        let google=window.google;
        let bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng({lat: 30.098659, lng: -97.938383}),
            new google.maps.LatLng({lat: 30.516863, lng: -97.568420})
        );
        const options={
            bounds: bounds,
            componentRestrictions: {country: 'us'}
        };

        return (
            <div className="mt-4">
                <h5>Enter two addresses to find real estate agencies near them!</h5>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="inputAddress1">Address 1</label>
                        <PlacesAutocomplete
                            value={this.state.address1}
                            onChange={this.handleChangeAddress1}
                            searchOptions={options}
                        >
                            {renderFunction}
                        </PlacesAutocomplete>
                    </div>
                    <div>
                        <label htmlFor="inputAddress2">Address 2</label>
                        <PlacesAutocomplete
                            value={this.state.address2}
                            onChange={this.handleChangeAddress2}
                        >
                            {renderFunction}
                        </PlacesAutocomplete>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

Search.propTypes={
    onSearch: PropTypes.func
};

export default Search;