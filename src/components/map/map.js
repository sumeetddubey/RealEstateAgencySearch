/**
 * Created by sumeetdubey on 5/14/18.
 */
import React, { Component } from 'react';
import {Map, InfoWindow, Marker} from 'google-maps-react';
import './map.css';

class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            places:[],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapProps: null,
            map: null
        };
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    componentDidUpdate(){
        this.fetchPlaces(this.state.mapProps, this.state.map);
    }

    fetchPlaces(mapProps, map) {
        console.log('fetching places...');
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);

        let location = this.props.addresses[0].geometry.location;
        let request = {
            location: location,
            radius: 16093.4,
            type: ['real_estate_agency']
        };
        let places=[];
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                places=results;
                location = this.props.addresses[1].geometry.location;
                request['location'] = location;
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        places = this.addWithoutDuplicates(places, results);
                        this.computeDistances(google, places);
                        places.sort(function(a, b){
                            return a.distance - b.distance
                        });
                        this.setState({
                            map: map,
                            mapProps: mapProps,
                            places: places
                        });
                        this.props.onGettingPlaces(places);
                    }
                })
            }
        })
    }

    computeDistances(google, places){
        for(var i in places){
            places[i]['distance'] = google.maps.geometry.spherical.computeDistanceBetween(
                    places[i].geometry.location, this.props.addresses[0].geometry.location
                )
            +
                google.maps.geometry.spherical.computeDistanceBetween(
                    places[i].geometry.location, this.props.addresses[0].geometry.location
                )
        }
    }

    addWithoutDuplicates(list, items){
        for(let i in items){
            let duplicate=false;
            for(let j in list){
                if(items[i]['id'] === list[j]['id']){
                    duplicate = true;
                    break;
                }
            }
            if(!duplicate)
                list.push(items[i]);
        }
        return list;
    }


    onMarkerClick(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    render() {
        return (
            <Map
                google={this.props.google}
                initialCenter={{
                    lat: 30.267153,
                    lng: -97.7430608
                }}
                zoom={12}
                onReady={this.fetchPlaces}
            >

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