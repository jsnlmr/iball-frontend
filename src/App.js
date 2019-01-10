import React, { Component } from 'react';
import ReactMapBoxGL, { Layer, Feature, GeoJSONLayer } from 'react-mapbox-gl'
import './App.css'


class App extends Component {
  constructor() {
    super()

    this.state = {
      players: [],
      courts: []
    }
  }


  render() {
    const Map = ReactMapBoxGL({
      accessToken: process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN
    })

    return (
      <Map
        style='mapbox://styles/mapbox/light-v9'
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={[-77.032883, 38.898129]}
      >
        <Layer
          type="circle"
          id="courts"
          layout={{ "icon-image": "marker-15" }}
          paint={{'fill-color': 'red'}}>
          <Feature coordinates={[-76.9954049, 38.8953954]}/>
        </Layer>
      </Map>
    );
  }
}

export default App;
