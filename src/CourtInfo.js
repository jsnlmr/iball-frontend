import React, { Fragment } from 'react'

const CourtInfo = props => {
  return (
    <Fragment>
      <h3>{props.court.name}</h3>
      <h4>{props.court.address}</h4>
    </Fragment>
  )
}

export default CourtInfo
