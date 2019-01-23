import React, { Component } from 'react'
import ReactMapBoxGL, { Layer, Feature, Popup } from 'react-mapbox-gl'
import { Container } from 'semantic-ui-react'
import mapboxgl from 'mapbox-gl'
import MapHover from './MapHover'

const Map = ReactMapBoxGL({
  accessToken: process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN,
})

const API = 'http://localhost:3001/api/v1'


class MapDisplay extends Component {
  constructor(props){
    super(props)

    this.map = null

    this.state = {
      loading: true,
      court: null,
      center: null,
      zoom: null
    }
  }

  /////////// COURT MAPPING ////////////

  mapCourts = () => this.props.courts.map(court => {
    return (
      <Feature
        key={court.id}
        properties={court}
        coordinates={[court.lng, court.lat]}
        onClick={(e) => {
          let court = e.feature.properties
          this.setState({
            center: [court.lng, court.lat],
            zoom: [15]
          })
          //this.map.flyTo({center: [court.lng, court.lat]})
          this.props.showCourt(e)
        }}
        onMouseEnter={(e, map) => this.hover(e, map)}
        onMouseLeave={(e, map) => this.exit(e, map)}
      />
    )
  })

  hover = (e, map) => {
    if(this.map) {this.map.state.map.getCanvas().style.cursor = 'pointer'}
    fetch(`${API}/courts/${e.feature.properties.id + 1}`)
      .then(res => res.json()).then(court => {

        this.setState({
          court: court
        })
      })

  }

  exit = (e, map) => {
    if(this.map) {this.map.state.map.getCanvas().style.cursor = ''}
    this.setState({
      court: null
    })
  }

  playerPopup = () => {
    let players = this.state.court.active_players.split('},{')
    if(players[0] === "[]") { return `No Players @ ${this.state.court.name}`}
    else {return `${players.length} Player @ ${this.state.court.name}`}
  }

  onStyleLoad = map => {
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false
    }))

    map.addControl(new mapboxgl.NavigationControl())
 }

  /////////// LIFECYCLE /////////////

  componentDidUpdate(prevProps) {
    if(prevProps.currentCourt !== this.props.currentCourt) {
      let court = this.props.currentCourt
      this.setState({
        center: [court.lng, court.lat],
        zoom: [15]
      })
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: [12],
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
          center={this.state.center}
          zoom={this.state.zoom}
          onStyleLoad={this.onStyleLoad}

        >
          <Layer
            type="circle"

            paint={
              {
                'circle-color': 'orangered',
                'circle-stroke-width': 1,
                'circle-radius': 7
              }
            }
          >

            { this.mapCourts() }
          </Layer>
          {
            this.state.court ? <MapHover court={this.state.court} /> : null
          }
        </Map>
      </Container> : null
    )
  }
}

export default MapDisplay

//[-77.032883, 38.898129]
// onStyleLoad={this.onStyleLoad}
// {
//   "property": "active_players",
//   "stops": [
//     ['[]', 'blue'],
//     // "temperature" is 100 -> circle color will be red
//     ['', 'green']
//   ]
// }
