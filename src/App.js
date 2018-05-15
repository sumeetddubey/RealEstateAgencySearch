import React, { Component } from 'react';
import './App.css';
import Search from './components/search/search';
import MapContainer from './components/map/map.js';
import PlacesList from './components/placesList/placesList.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            addresses: [],
            places: []
        };

        this.onSearch = this.onSearch.bind(this);
        this.onGettingPlaces = this.onGettingPlaces.bind(this);
        this.selectPlace = this.selectPlace.bind(this);
    }

    onSearch(addresses){
        this.setState({addresses});
    }

    onGettingPlaces(places){
        this.setState({places});
    }

    selectPlace(place){
        this.setState({
            selectedPlace: place
        })
    }

    render() {
        const searchWithoutResults = <div>
            <Search
                onSearch={this.onSearch}
            />
        </div>;

        const searchWithResults = <div className="my-4">
            <Search
                onSearch={this.onSearch}
            />
            <div className="map-container my-4">
                <MapContainer
                    addresses={this.state.addresses}
                    google={window.google}
                    selectedPlace={this.state.selectedPlace}
                    onGettingPlaces={this.onGettingPlaces}
                />
            </div>
            <PlacesList
                places={this.state.places}
                selectPlace={this.selectPlace}
            />
        </div>;


        return (
            <div className="container">
                {this.state.addresses.length === 0 ? searchWithoutResults : searchWithResults}
            </div>
        );
    }
}
export default App;