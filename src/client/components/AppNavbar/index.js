import { LinkContainer } from 'react-router-bootstrap'
import {client as config} from 'c0nfig'
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
            {
              this.props.user &&
              <LinkContainer to={{ pathname: '/hubs', query: { } }}>
                <NavItem eventKey={1.2}>
                  <label className="nav-label">
                    &nbsp; Hubs
                  </label>
                </NavItem>
              </LinkContainer>
            }
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
            <NavItem eventKey={2.3} href={`${config.apiUrl}/graphiql`} target="_blank">
              <label className="nav-label" style={{width: "100%", height: "20px", float: "left"}}>
                &nbsp; GraphQL
              </label>
              <label className="nav-label" style={{left: "20px", top: "-6px"}}>
                &nbsp; IDE
              </label>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppNavbar