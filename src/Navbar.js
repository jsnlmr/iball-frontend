import React, { Component } from 'react'
import { Menu, Item, Button, Dropdown, Input } from 'semantic-ui-react'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  dipsplayNav = () => {
    return ( this.props.current ? (
      <Menu size='large'>
        <Menu.Item icon>iBall</Menu.Item>

        <Dropdown item text='Friends'>
          <Dropdown.Menu>
            <Dropdown.Item>Friend 1</Dropdown.Item>
            <Dropdown.Item>Friend 2</Dropdown.Item>
            <Dropdown.Item>Friend 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text='Favorites'>
          <Dropdown.Menu>
            <Dropdown.Item>Favorite 1</Dropdown.Item>
            <Dropdown.Item>Favorite 2</Dropdown.Item>
            <Dropdown.Item>Favorite 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item name='profile' />

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input className='icon' icon='search'
              placeholder='Find a Basketball Court' />
          </Menu.Item>

          <Menu.Item>
            <Button primary>LOGOUT</Button>
          </Menu.Item>
        </Menu.Menu>
     </Menu>
    ) : (
      <Menu size='large'>
        <Menu.Item icon>iBall</Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input className='icon' icon='user'
              placeholder='Username' />
            <Input className='icon' icon='password'
              placeholder='Password' />
          </Menu.Item>

          <Menu.Item>
            <Button primary>LOGIN</Button>
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

// <div>
//   <span id='logo'>iBall</span>
//   <span>
//     <label>Username</label>
//     <input />
//   </span>
//   <span>
//     <label>Password</label>
//     <input />
//   </span>
// </div>