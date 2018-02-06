import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavBar = (props) => {

  return (
    <Menu secondary>
      <Menu.Item as={NavLink} exact to="/" name="Home" />
      <Menu.Item as={NavLink} to="/transactions" name="Transaction" />
      <Menu.Item as={NavLink} to="/businesses" name="Businesses" />
      <Menu.Item as={NavLink} to="/analytics" name="Analytics" />
    </Menu>
  )


}




export default NavBar
