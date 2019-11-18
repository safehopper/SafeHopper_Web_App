import React, { Component } from 'react';
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';
const axios = require('axios');

let search = window.location.search;
let params = new URLSearchParams(search);
let foo = params.get('query');

const api = {
    key: "AIzaSyDunQzzS1U8QHliMAYJ6BdnFDRRkc6Iue8",
}

class MapContainer extends Component {
    state = {
        waypoints:[],
        centerPoint: {lat: 0, lng: 0},
        initialPoint: {lat: 38.784331, lng: -100.117186},
        zoom: 4,
    }

    mapStyles = {
        width: '100%',
        height: '100%',
    };

    render(){
        return(
            <div>
                <Map
                    google={this.props.google}
                    zoom={this.state.zoom}
                    style={this.mapStyles}
                    initialCenter={this.state.initialPoint}
                    center = {this.state.centerPoint}
                >{this.state.waypoints.map((waypoint, i) => {
                    return (
                      <Marker
                        key={i}
                        position={{ lat: waypoint.latitude, lng: waypoint.longitude }}
                      />
                    );
                  })}</Map>
            </div>
        )
    };

    componentDidMount() {
        this.getWaypoints();
    }

    async getWaypoints() {
        if(foo != null) {
            const response = await axios.post("http://localhost:3000/alerts/getAlert",
                    { "key":"pxC3bE5Wzm7dWy2eaF5p", "alertId": foo, 	"email":"justinterrydev@gmail.com"});
            if(response.data.content.waypoints[0].waypoints != null){
                this.setMarkers(response.data.content.waypoints[0].waypoints);
            }
        }
    }

    setMarkers(wps) {
        console.log("WPS: " + wps);
        this.setState({waypoints: wps, zoom: 20, centerPoint: {lat: wps[wps.length-1].latitude, lng: wps[wps.length-1].longitude}})
        console.log(this.state);
        this.forceUpdate();
    }
}



export default GoogleApiWrapper({
    apiKey: api.key,
  })(MapContainer);