import React, { Component } from 'react';
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';
const axios = require('axios');

let search = window.location.search;
let params = new URLSearchParams(search);
let foo = params.get('query');
//
const api = {
    key: process.env.REACT_APP_API_KEY,
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
                    if(i === this.state.waypoints.length-1){
                        return (                    
                            <Marker
                              key={i}
                              position={{ lat: waypoint.latitude, lng: waypoint.longitude }}
                            />
                          )
                    }else{
                        return (                    
                        <Marker
                            key={i}
                            position={{ lat: waypoint.latitude, lng: waypoint.longitude }}
                            icon={{
                                url: "https://i.ibb.co/jLxJm2D/dot.png",
                                anchor: new window.google.maps.Point(24,24),
                                scaledSize: new window.google.maps.Size(24,24)
                            }}
                        />
                        );
                        }
                  })}</Map>
            </div>
        )
    };

    componentDidMount() {
        setInterval(async () => {
        
            if(foo != null) {
                const response = await axios.post("https://safe-hopper-server.herokuapp.com/alerts/getAlert",
                        { "key":"pxC3bE5Wzm7dWy2eaF5p", "alertId": foo, "email":"justinterrydev@gmail.com"}, );
                if(response.data.content.waypoints[0] != null){
                    this.setMarkers(response.data.content.waypoints[0].waypoints);
                }
            }
        }, 5000);
    }

    setMarkers(wps) {
        this.setState({waypoints: wps, zoom: 20, centerPoint: {lat: wps[wps.length-1].latitude, lng: wps[wps.length-1].longitude}})
        this.forceUpdate();
    }
}



export default GoogleApiWrapper({
    apiKey: api.key,
  })(MapContainer);