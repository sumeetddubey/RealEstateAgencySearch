import React, { Component } from 'react';
import './App.css';
import Search from './components/search/search';

class App extends Component {
    onSearch(addresses){
        console.log(addresses);
    }

    render() {
        return (
            <Search
                onSearch={this.onSearch}
            />
        );
    }
}
export default App;