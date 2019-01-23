import React, { Component } from 'react'
import { Grid, Header, Image, Form, Button, Segment } from 'semantic-ui-react'

const API = 'http://localhost:3001/api/v1'


class PlayerProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: props.current.username,
      password: '',
      newPassword: ''
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  deleteFetch = () => {
    fetch(`${API}/players/${this.props.current.id}`, { method: 'DELETE'})
      .then(this.props.delete(this.props.current))
  }

  handleSubmit = () => {
    let player = {
      username: this.state.username,
      password: this.state.newPassword
    }

    fetch(`${API}/players/${this.props.current.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(player)
    }).then(res => res.json()).then(p => this.props.update(p))
  }

  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> My Profile
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left'
                  placeholder='Username' value={this.state.username}
                  onChange={this.handleChange} name='username' />

                  <Form.Input fluid icon='lock' iconPosition='left'
                    placeholder='New Password' type='password'
                    value={this.state.newPassword} onChange={this.handleChange}
                    name='newPassword' />
                <Button color='teal' fluid size='large' type='submit'>
                  Update My Profile
                </Button>
              </Segment>
            </Form>
            <Button onClick={this.deleteFetch}>Delete My Account</Button>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default PlayerProfile

// <Form.Input fluid icon='lock' iconPosition='left'
//   placeholder='Password' type='password'
//   value={this.state.password} onChange={this.handleChange}
//   name='password' />
