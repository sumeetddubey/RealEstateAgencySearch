/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './map.css';

class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            places:[],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    fetchPlaces(mapProps, map) {
        const location = this.props.addresses[0].geometry.location;
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        const request = {
            location: location,
            radius: 16093.4,
            type: ['hotel']
        };
        service.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                this.setState({
                    places: results
                });
            }
        })
    }

    onMarkerClick(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
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
                zoom={12}
                onReady={this.fetchPlaces}>

                {this.state.places && this.state.places.map((place, i) =>
                    <Marker
                        key={i}
                        name={place.name}
                        position={place.geometry.location}
                        onClick={this.onMarkerClick}
                    />
                )}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <p className="lead">{this.state.selectedPlace.name}</p>
                    </div>
                </InfoWindow>
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