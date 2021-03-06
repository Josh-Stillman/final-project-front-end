import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import TransactionsContainer from './containers/TransactionsContainer'
import BusinessesContainer from './containers/BusinessesContainer'
import HomePage from './containers/HomePage'
import Analytics from './Analytics'
import Details from './containers/Details'
import Login from './Login'
import SignUp from './SignUp'
import { Container, Segment} from 'semantic-ui-react'
import * as actions from './actions'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount(){
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "undefined") {
        this.props.refreshUser()
    }
  }

  componentWillReceiveProps(nextProps){
    if (!this.props.user.id && !!nextProps.user.id) {
      this.props.fetch_user_data(nextProps.user.id)
      this.props.fetch_transactions(nextProps.user.id)
      this.props.fetch_businesses(nextProps.user.id)
    }
  }

  render() {
    return (
      <Router>
        <div>
        <NavBar />
        <Route exact path="/" render={() => <HomePage/>} />
        <Route path="/transactions" component={TransactionsContainer} />
        <Route path="/businesses" component={BusinessesContainer} />
        <Route path="/analytics" render={() => <Analytics />} />
        <Route path="/details" render={() => <Details />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/signup" render={() => <SignUp />} />
        </div>
      </Router>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.all,
    user: state.auth.currentUser
  }
}

export default connect(mapStateToProps, actions)(App);
