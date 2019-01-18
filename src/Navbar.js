import React, { Component } from 'react'
import { Menu, Item, Button, Dropdown, Input, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Favorite from './Favorite'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  renderFavorites = () => {
    let favs = this.props.current.favorites

    return favs.map(f => <Favorite key={f.id} court={f} /> )
  }



  loggedInNav = () => {
    let favs = this.renderFavorites()
    return (
      <Menu fixed='top' size='large'>
        <Menu.Item as={Link} to='/' icon>iBall</Menu.Item>

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
      </Menu>
    )
  }

  loggedOutNav = () => {
    return (
      <Menu size='large'>
        <Menu.Item as={Link} to='/' icon>iBall</Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Form onSubmit={this.props.login}>
              <Form.Input className='icon' icon='user' iconPosition='left'
                placeholder='Username' />
              <Form.Input className='icon' icon='lock' iconPosition='left'
                placeholder='Password' type='password' />
                <Menu.Item>
                  <Button type='submit' primary>LOGIN</Button>
                  <Link to='/signup'>Register as New User</Link>
                </Menu.Item>
            </Form>
          </Menu.Item>

        </Menu.Menu>
      </Menu>
    )
  }

  render() {
    return this.props.current ? this.loggedInNav() : this.loggedOutNav()
  }
}

export default Navbar
