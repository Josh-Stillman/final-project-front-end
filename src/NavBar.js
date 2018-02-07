import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'
import { Menu, Header, Divider, Icon } from 'semantic-ui-react'

const NavBar = (props) => {

  return (
    <Menu >

      <Menu.Item as={Link} exact to="/" name="Home" color="grey" ><Header as="h2" style={{fontFamily: "Inconsolata, monospace"}}>Follow  <span>&#8594;</span>  your  <span>&#8594;</span>  $</Header></Menu.Item>

      <Menu.Item as={NavLink} exact to="/" name="Home" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="home"/> Home</Menu.Item>
      <Menu.Item as={NavLink} to="/transactions" name="Transactions" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="credit card alternative"/> Transactions</Menu.Item>
      <Menu.Item as={NavLink} to="/businesses" name="Businesses" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}}><Icon name="building outline"/> Businesses</Menu.Item>
      <Menu.Item as={NavLink} to="/analytics" name="Analytics" style={{fontSize: 16, fontFamily: "Inconsolata, monospace"}} ><Icon name="bar graph" /> Analytics</Menu.Item>
    </Menu>
  )


}




export default NavBar
