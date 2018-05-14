import React, { Component } from 'react';
import './App.css';
import Search from './components/search/search';
import MapContainer from './components/map/map.js';

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
        this.setState({addresses})
    }

    onGettingPlaces(places){
        console.log(places);
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
            <MapContainer
                addresses={this.state.addresses}
                onGettingPlaces={this.onGettingPlaces}
                google={window.google}
            />
        </div>;


        return (
            this.state.addresses.length === 0 ? searchWithoutMap : searchWithMap
        );
    }
}
export default App;