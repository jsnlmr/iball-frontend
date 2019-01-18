import React, { Component } from 'react'
import ReactMapBoxGL, { Layer, Feature, Popup } from 'react-mapbox-gl'
import { Container } from 'semantic-ui-react'

const Map = ReactMapBoxGL({
  accessToken: process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN,
})

class MapDisplay extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading: true
    }
  }

  /////////// COURT MAPPING ////////////

  mapCourts = () => this.props.courts.map(court => {
    return (
      <Feature key={court.id} properties={court} coordinates={[court.lng, court.lat]} onClick={this.props.showCourt} />
    )
  })


  /////////// LIFECYCLE /////////////

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        gps: [position.coords.longitude, position.coords.latitude],
        loading: false
      })
    })
  }

  render() {

    return (
      !this.state.loading ?
      <Container id='map'>
        <Map
          ref={e => {this.map = e}}
          style='mapbox://styles/mapbox/light-v9'
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[this.state.gps[0], this.state.gps[1]]}
          zoom={[12]}
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
      </Container> : null
    )
  }
}

export default MapDisplay

//[-77.032883, 38.898129]
