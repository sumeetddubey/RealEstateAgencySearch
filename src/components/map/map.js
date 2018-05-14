/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './map.css';

class MapContainer extends Component {
    constructor(props){
        super(props);

        this.fetchPlaces = this.fetchPlaces.bind(this);
    }

    fetchPlaces(mapProps, map) {
        console.log(this.props.addresses);
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        const request = {
            type: ['hotel']
        };
        service.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                //updatePlaces(results);
            }
        })
    }

    render() {
        const style = {
            margin: 'auto',
            width: '75%',
            height: '75%'
        };

        return (
            <Map
                google={this.props.google}
                style={style}
                initialCenter={{
                    lat: 30.267153,
                    lng: -97.7430608
                }}
                zoom={14}
                onReady={this.fetchPlaces}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
            </Map>

        );
    }
}

export default MapContainer;
//const LoadingContainer = (props) => (
//    <div className="map-container"></div>
//);
//
//export default GoogleApiWrapper({
//    LoadingContainer: LoadingContainer
//})(MapContainer)