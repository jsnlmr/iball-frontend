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
      password: '',
      favorites: []
    }
  }

  renderFavorites = () => {
    let favs = this.props.favorites

    return favs.map(f => <Favorite key={f.id} court={f} fetchCourt={this.props.fetchCourt} /> )
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
        <Menu size='big' position='left'>
          <Container>
            <Menu.Item className='nav-item' as={Link}  to='/' header>
              <img src='https://images.vexels.com/media/users/3/129332/isolated/lists/b3f0ad2e079ac9027c5eb0a2d1c8549b-basketball-silhouette-icon.png' />
              iBall
            </Menu.Item>

            <Dropdown className='nav-item' item text='Friends'>
              <Dropdown.Menu>
                <Dropdown.Item text='Friend 1' description='Online' />
                <Dropdown.Item text='Friend 2' description='Online' />
                <Dropdown.Divider />
                <Dropdown.Item text='Friend 3' description='Offline' />
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className='nav-item' item text='Favorites'>
              <Dropdown.Menu>
                {
                  favs.length !== 0 ? favs : <Dropdown.Item text='No Favorites' />
                }
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item className='nav-item' as={Link} to='/profile' name='profile' />

            <Menu.Menu position='right'>
              <Menu.Item>
                <Input className='search' icon='search'
                  placeholder='Find a Basketball Court' />
              </Menu.Item>

              <Menu.Item position='right'>
                <Button className='logout' color='yellow' onClick={this.props.logout}>LOGOUT</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    )
  }

  loggedOutNav = () => {
    return (
      <div>
        <Menu size='large'>
          <Container>
            <Menu.Item as={Link} to='/' icon header>
            <img src='https://images.vexels.com/media/users/3/129332/isolated/lists/b3f0ad2e079ac9027c5eb0a2d1c8549b-basketball-silhouette-icon.png' />
            iBall
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
                <Form onSubmit={this.handleSubmit}>
                  <Input name='username' className='icon' icon='user' iconPosition='left'
                    placeholder='Username' onChange={this.handleChange} />
                  <Input name='password' className='icon' icon='lock' iconPosition='left'
                    placeholder='Password' type='password'
                    onChange={this.handleChange} />
                  <Button type='submit' color='green' primary>LOGIN</Button>
                </Form>
              </Menu.Item>
              <Menu.Item>
                <Link to='/signup'>Register as New User</Link>
              </Menu.Item>

            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    )
  }

  // componentDidMount() {
  //   if(this.props.current) {
  //     fetch(`${API}/players/${this.props.current.id}`).then(res => res.json()).then(player => this.setState({favorites: player.favorites})
  //   )}
  // }

  render() {
    return this.props.current ? this.loggedInNav() : this.loggedOutNav()
  }
}

export default Navbar
