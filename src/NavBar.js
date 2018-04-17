import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink, withRouter} from 'react-router-dom'
import { Menu, Header, Divider, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as actions from './actions';

class NavBar extends React.Component {
  constructor(){
    super()

  }

  loggedInMenu = () => {
    return (
      <Menu >

        <Menu.Item as={Link} exact to="/" name="Home" color="grey" ><Header as="h2" style={{fontFamily: "Inconsolata, monospace"}}>Follow  <span>&#8594;</span>  your  <span>&#8594;</span>  $</Header></Menu.Item>

        <Menu.Item as={NavLink} exact to="/" name="Home" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="home"/> Home</Menu.Item>
        <Menu.Item as={NavLink} to="/transactions" name="Transactions" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="credit card alternative"/> Transactions</Menu.Item>
        <Menu.Item as={NavLink} to="/businesses" name="Businesses" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}}><Icon name="building outline"/> Businesses</Menu.Item>
        <Menu.Item as={NavLink} to="/analytics" name="Analytics" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="bar graph" /> Analytics</Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item onClick={() => this.props.logoutUser(this.props.history)} to="/" name="Logout" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="log out" /> Logout</Menu.Item>
      </Menu.Menu>
    </Menu>
  )}

  loggedOutMenu = () => {
    return (
      <Menu >
        <Menu.Item as={Link} exact to="/" name="Home" color="grey" ><Header as="h2" style={{fontFamily: "Inconsolata, monospace"}}>Follow  <span>&#8594;</span>  your  <span>&#8594;</span>  $</Header></Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to={{pathname: "/login", state: {guest: true}}} name="Demo - Login as Guest" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="user outline" /> Demo - Login as Guest</Menu.Item>
          <Menu.Item as={NavLink} to={{pathname: "/login", state: {guest: false}}} name="Login" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="user outline" /> Login</Menu.Item>
          <Menu.Item as={NavLink} to="/signup" name="Signup" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="user add" />Sign Up</Menu.Item>
        </Menu.Menu>
    </Menu>
  )}



  render() {
    return (
      <React.Fragment>{this.props.loggedIn ? this.loggedInMenu() : this.loggedOutMenu()}</React.Fragment>
  )
}


}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  username: state.auth.currentUser.username
});

export default withRouter(connect(mapStateToProps, actions)(NavBar))
