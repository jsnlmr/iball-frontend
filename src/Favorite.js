import React, { Component, Fragment } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

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

  clickHandler = () => {
    this.props.history.push(`/courts/${this.props.court.id}`)
    this.props.fetchCourt(this.props.court.id)
  }

  render() {

    return (
      <Fragment>
        {
          this.state.players.length === 0 ?
            <Dropdown.Item text={this.props.court.name}
              description='Inactive' onClick={this.clickHandler} />
              :
            <Dropdown.Item text={this.props.court.name}
              description={`${this.state.players.length} Active`}
              onClick={this.clickHandler} />
        }
      </Fragment>
    )
  }
}

export default withRouter(Favorite)
