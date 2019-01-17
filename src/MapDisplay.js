import React, { Component } from 'react'
import ReactMapBoxGL, { Layer, Feature, Popup } from 'react-mapbox-gl'

const Map = ReactMapBoxGL({
  accessToken: process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN,
})

class MapDisplay extends Component {
  constructor(props){
    super(props)
  }

  /////////// COURT MAPPING ////////////

  mapCourts = () => this.props.courts.map(court => {
    return (
      <Feature key={court.id} properties={court} coordinates={[court.lng, court.lat]}
        onClick={this.props.showCourt} />
    )
  })


  /////////// LIFECYCLE /////////////

  render() {
    return (
      <div id='map'>
        <Map
          ref={e => {this.map = e}}
          style='mapbox://styles/mapbox/light-v9'
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[-77.032883, 38.898129]}
          onStyleLoad={this.onMapLoad}
        >
          <Layer
            type="circle"

            paint={{
              'circle-color': 'red',
              'circle-stroke-width': 1,
            }}>

            { this.mapCourts() }
          </Layer>
        </Map>
      </div>
    )
  }
}

export default MapDisplay

//
