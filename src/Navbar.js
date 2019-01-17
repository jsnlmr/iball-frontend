import React, { Component } from 'react'
import { Menu, Item, Button, Dropdown, Input, Form } from 'semantic-ui-react'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  dipsplayNav = () => {
    return ( this.props.current ? (
      <Menu fixed='top' size='large'>
        <Menu.Item icon>iBall</Menu.Item>

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
            <Dropdown.Item text='Favorite 1' description='9 Active' />
            <Dropdown.Item text='Favorite 2' description='5 Active' />
            <Dropdown.Divider />
            <Dropdown.Item text='Favorite 3' description='Inactive' />
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item name='profile' />

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
    ) : (
      <Menu size='large'>
        <Menu.Item icon>iBall</Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Form onSubmit={this.props.login}>
              <Form.Input className='icon' icon='user' iconPosition='left'
                placeholder='Username' />
              <Form.Input className='icon' icon='lock' iconPosition='left'
                placeholder='Password' type='password' />
                <Menu.Item>
                  <Button type='submit' primary>LOGIN</Button>
                </Menu.Item>
            </Form>
          </Menu.Item>

        </Menu.Menu>
      </Menu>
      )
    )
  }

  render() {
    return this.dipsplayNav()
  }
}

export default Navbar
