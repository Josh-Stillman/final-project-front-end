import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'

const NavBar = (props) => {

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/transactions">Transaction</NavLink>
      <NavLink to="/businesses">Businesses</NavLink>
      <NavLink to="/analytics">Analytics</NavLink>
    </div>
  )


}




export default NavBar
