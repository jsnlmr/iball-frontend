import React, { Component } from 'react'
import { Menu, Item, Button, Dropdown, Input, Form, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Favorite from './Favorite'

const API = 'http://localhost:3001/api/v1'


class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  renderFavorites = () => {
    let favs = this.props.current.favorites

    return favs.map(f => <Favorite key={f.id} court={f} /> )
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    e.persist()

    let user = {
      username: this.state.username,
      password: this.state.password
    }

    //this.props.login(e)
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json()).then(data => {
      if(data.error) { alert('Incorrect username or password') }
      else {
        this.props.login(data.user_info)
        localStorage.setItem('token', data.token)
      }
    })

  }


  loggedInNav = () => {
    let favs = this.renderFavorites()
    return (
      <div>
        <Menu size='large'>
          <Container>
            <Menu.Item as={Link}  to='/' header>iBall</Menu.Item>

            <Dropdown item text='Friends'>
              <Dropdown.Menu>
                <Dropdown.Item text='Friend 1' description='Online' />
                <Dropdown.Item text='Friend 2' description='Online' />
                <Dropdown.Divider />
                <Dropdown.Item text='Friend 3' description='Offline' />
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text='Favorites'>
              <Dropdown.Menu>
                {
                  favs.length !== 0 ? favs : <Dropdown.Item text='No Favorites' />
                }
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item as={Link} to='/profile' name='profile' />

            <Menu.Menu position='right'>
              <Menu.Item>
                <Input className='icon' icon='search'
                  placeholder='Find a Basketball Court' />
              </Menu.Item>

              <Menu.Item>
                <Button primary onClick={this.props.logout}>LOGOUT</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    )
  }

  loggedOutNav = () => {
    return (
      <Menu size='large'>
        <Container>
          <Menu.Item as={Link} to='/' icon header>iBall</Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input name='username' className='icon' icon='user' iconPosition='left'
                  placeholder='Username' onChange={this.handleChange} />
                <Form.Input name='password' className='icon' icon='lock' iconPosition='left'
                  placeholder='Password' type='password'
                  onChange={this.handleChange} />
                  <Menu.Item>
                    <Button type='submit' primary>LOGIN</Button>
                    <Link to='/signup'>Register as New User</Link>
                  </Menu.Item>
              </Form>
            </Menu.Item>

          </Menu.Menu>
        </Container>
      </Menu>
    )
  }

  render() {
    return this.props.current ? this.loggedInNav() : this.loggedOutNav()
  }
}

export default Navbar
