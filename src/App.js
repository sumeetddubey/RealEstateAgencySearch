import React, { Component } from 'react';
import './App.css';
import Search from './components/search/search';
import MapContainer from './components/map/map.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            addresses: []
        }

    }

    onSearch(addresses){
        console.log(addresses);
    }

    render() {
        return (
            <div>
                <Search
                    onSearch={this.onSearch}
                />
                <MapContainer
                    addresses={this.state.addresses}
                    google={window.google}
                />
            </div>
        );
    }
}
export default App;