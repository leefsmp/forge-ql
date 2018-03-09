import { LinkContainer } from 'react-router-bootstrap'
import { graphql } from 'react-apollo'
import logo from './adsk-forge.png'
import gql from 'graphql-tag'
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

    this.onLogin = this.onLogin.bind(this)
    this.onAbout = this.onAbout.bind(this)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  login () {

    const { appState } = this.props

    if (appState.user) {

      this.props.setUser(null)

      this.forgeSvc.logout().then(() => {

        window.location.reload()
      })

    } else {

      this.forgeSvc.login()
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onLogin () {

    this.props.doLogin()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onAbout () {

    this.props.showAbout()
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
          </Nav>
          
          <Nav pullRight>
            <NavItem eventKey={2.1} onClick={this.onLogin}>
              {
                !this.props.user &&
                <span className="login"/>
              }
              {
                this.props.user &&
                <img className="avatar" src={this.props.user.profileImages.sizeX80} alt=""/>
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

const doLogin = graphql(gql`
  mutation DoLogin {
    doLogin @client
  }`, {
  props: ({ mutate }) => ({
    doLogin: () => mutate({})
  })
})

const showAbout = graphql(gql`
  mutation ShowAbout {
    showAbout @client
  }`, {
  props: ({ mutate }) => ({
    showAbout: () => mutate({})
  })
})

export default doLogin(showAbout(AppNavbar))