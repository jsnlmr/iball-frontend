import React, { Component, Fragment } from 'react'
import { Dropdown } from 'semantic-ui-react'

const API = 'http://localhost:3001/api/v1'

class Favorite extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: []
    }
  }

  fetchInfo = id => {
    fetch(`${API}/courts/${id}`)
      .then(res => res.json())
      .then(court => this.setState({players: court.active_players}))
  }

  componentDidMount() {
    this.fetchInfo(this.props.court.id)
  }

  render() {

    return (
      <Fragment>
        {
          this.state.players.length === 0 ?
            <Dropdown.Item text={this.props.court.name}
              description='Inactive' />
              :
            <Dropdown.Item text={this.props.court.name}
              description={`${this.state.players.length} Active`} />
        }
      </Fragment>
    )
  }
}

export default Favorite
