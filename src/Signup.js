import React, { Component } from 'react'
import { Grid, Header, Image, Form, Button, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const API = 'http://localhost:3001/api/v1'


class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()

    let user = {
      username: this.state.username,
      password: this.state.password
    }

    fetch(`${API}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'applicaton/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json()).then(player => this.props.login(player))
  }

  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Signup for Your Account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left'
                  placeholder='Username' value={this.state.username}
                  onChange={this.handleChange} name='username' />
                <Form.Input fluid icon='lock' iconPosition='left'
                  placeholder='Password' type='password'
                  value={this.state.password} onChange={this.handleChange}
                  name='password' />
                <Button color='teal' fluid size='large'
                  type='submit'>
                  Register Account</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Signup)
