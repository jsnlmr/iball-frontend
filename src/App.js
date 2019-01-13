import React, { Component } from 'react'
import ReactMapBoxGL, { Layer, Feature, Popup } from 'react-mapbox-gl'
import './App.css'
import Navbar from './Navbar'
import CourtDetail from './CourtDetail'
import { Menu, Sidebar, Segment } from 'semantic-ui-react'

const Map = ReactMapBoxGL({
  accessToken: process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN,
})


class App extends Component {
  constructor() {
    super()

    this.state = {
      players: [],
      friends: [],
      favorites: [],
      courts: [],
      selected: null,
      current_user: true
    }
  }

  handleClick = (e) => {
    console.log(e.lngLat);
    this.setState({selected: true})
  }

  handleMouseEnter = () => {
    Map.style = {cursor: 'pointer'}
  }

  closePopup = () => {
    console.log('close popup');
    this.setState({selected: null})
  }

  render() {


    return (
      <div>
        <Navbar current={this.state.current_user} />
        <Map
          style='mapbox://styles/mapbox/light-v9'
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[-77.032883, 38.898129]}
        >
          <Layer
            type="circle"

            paint={{
              'circle-color': 'red',
              'circle-stroke-width': 1,
            }}>
            <Feature
            coordinates={[-76.9954049, 38.8953954]}
            onClick={this.handleClick}

            />
          </Layer>
          {
            this.state.selected ?
              <Sidebar.Pushable id='sidebar' animation='push' direction='left'
                visible vertical >
                <CourtDetail close={this.closePopup}
                  current={this.state.current_user} />
              </Sidebar.Pushable>
            :
              null
          }
        </Map>
      </div>
    );
  }
}

export default App;

// layout={{ "icon-image": "marker-15" }}
//          id="courts"

// <Popup coordinates={[-76.9954049, 38.8953954]} >
//   <CourtDetail close={this.closePopup} current={this.state.current_user} />
// </Popup>
