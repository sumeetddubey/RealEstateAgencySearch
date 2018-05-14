/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
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
        let addresses = [this.state.address1, this.state.address2];
        this.props.onSearch(addresses)
    }

    handleChangeAddress1 = (address) => {
        this.setState({ address1: address })
    };

    handleChangeAddress2(address){
        this.setState({
            address2: address.target.value
        })
    }

    render() {
        const renderFunction = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
            <div className="form-group">
                <label htmlFor="inputAddress1">Address 1</label>
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

        return (
            <div className="container mt-4">
                <h4>Enter two addresses to find real estate agencies near them</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="">
                        <PlacesAutocomplete
                            value={this.state.address1}
                            onChange={this.handleChangeAddress1}
                        >
                            {renderFunction}
                        </PlacesAutocomplete>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2" onChange={this.handleChangeAddress2}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Search;