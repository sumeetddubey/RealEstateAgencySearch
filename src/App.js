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
    }

    onSearch(addresses){
        this.setState({addresses});
    }

    onGettingPlaces(places){
        this.setState({places});
    }

    render() {
        const searchWithoutMap = <div>
            <Search
                onSearch={this.onSearch}
            />
        </div>;

        const searchWithMap = <div>
            <Search
                onSearch={this.onSearch}
            />
            <div className="row places-container my-4">
                <div className="col-4 places-list-container">
                    <PlacesList
                        places={this.state.places}
                    />
                </div>
                <div className="col-8">
                    <MapContainer
                        addresses={this.state.addresses}
                        onGettingPlaces={this.onGettingPlaces}
                        google={window.google}
                    />
                </div>
            </div>
        </div>;


        return (
            <div className="container">
                {this.state.addresses.length === 0 ? searchWithoutMap : searchWithMap}
            </div>
        );
    }
}
export default App;