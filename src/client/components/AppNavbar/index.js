import { LinkContainer } from 'react-router-bootstrap'
import logo from './adsk-forge.png'
import './appNavbar.scss'
import React from 'react'
import {
  NavItem,
  Navbar,
  Nav
} from 'react-bootstrap'

class AppNavbar extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super(props)

    this.onAbout = this.onAbout.bind(this)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onAbout () {

    
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {

    const user = this.props.user

    console.log(user)

    const username = user
      ? `${user.firstName} ${user.lastName}`
      : ''

    return (
      <Navbar className="forge-ql">
        <Navbar.Header>
          <Navbar.Brand>
            <NavItem className="brand"
              href="https://forge.autodesk.com"
              target="_blank">
              <img height="30" src={logo} alt=""/>
            </NavItem>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{ pathname: '/', query: { } }}>
              <NavItem eventKey={1.1}>
                <label className="nav-label">
                  &nbsp; Home
                </label>
              </NavItem>
            </LinkContainer>
          </Nav>
          
          <Nav pullRight>
            <NavItem eventKey={2.1} onClick={this.props.onLogin}>
              {
                !this.props.user &&
                <span className="login"/>
              }
              {
                this.props.user && 
                <img className="avatar" src={this.props.user.profileImage} alt=""/>
              }
              <label className="nav-label">
                &nbsp; { user ? username : 'Login'}
              </label>
            </NavItem>
            <NavItem eventKey={2.2} onClick={this.onAbout}>
              <label className="nav-label">
                &nbsp; About ...
              </label>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppNavbar