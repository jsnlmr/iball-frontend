import React, { Component } from 'react'
import { Grid, Header, Image, Form, Button, Segment } from 'semantic-ui-react'


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

  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left'
                  placeholder='Username' value={this.state.username}
                  onChange={this.handleChange} name='username' />
                <Form.Input fluid icon='lock' iconPosition='left'
                  placeholder='Password' type='password'
                  value={this.state.password} onChange={this.handleChange}
                  name='password' />
                <Button color='teal' fluid size='large'>Login</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Signup
