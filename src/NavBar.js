import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'
import { Menu, Header } from 'semantic-ui-react'

const NavBar = (props) => {

  return (
    <Menu >

      <Menu.Item as={Link} exact to="/" name="Home" color="grey" inverted><Header as="h4">Follow  <span>&#8594;</span>  <i>your</i>  <span>&#8594;</span>  $</Header></Menu.Item>

      <Menu.Item as={NavLink} exact to="/" name="Home" />
      <Menu.Item as={NavLink} to="/transactions" name="Transaction" />
      <Menu.Item as={NavLink} to="/businesses" name="Businesses" />
      <Menu.Item as={NavLink} to="/analytics" name="Analytics" />
    </Menu>
  )


}




export default NavBar
