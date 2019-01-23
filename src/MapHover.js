import React from 'react'
import { Popup } from 'react-mapbox-gl'

const MapHover = (props) => {

  const playerPopup = () => {
    
    let players = props.court.active_players
    return players.length === 0 ? `No Players @ ${props.court.name}` :
      `${players.length} Player(s) @ ${props.court.name}`
  }


  return (
    <Popup coordinates={[props.court.lng,
      props.court.lat]}>
      <h4>{playerPopup()}</h4>
    </Popup>
  )
}

export default MapHover
