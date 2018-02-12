import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import TransactionsContainer from './containers/TransactionsContainer'
import BusinessesContainer from './containers/BusinessesContainer'
import HomePage from './containers/HomePage'
import Analytics from './Analytics'
import Login from './Login'
import SignUp from './SignUp'
import { Container, Segment} from 'semantic-ui-react'
import * as actions from './actions'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount(){
    // this.props.fetch_transactions()
    // this.props.fetch_businesses()
    // this.props.fetch_user_data(this.props.user.id)
    // console.log("app mounting", this.props.user.id);
  }

  render() {
    return (
      <Router>
        <div>
        <NavBar />
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/transactions" component={TransactionsContainer} />
        <Route path="/businesses" component={BusinessesContainer} />
        <Route path="/analytics" render={() => <Analytics />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/signup" render={() => <SignUp />} />
        </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    transactions: state.transactions.all,
    user: state.auth.currentUser
  }
}

// const mapDispatchToProps = (dispatch) =>{
//   return {
//     transactions: state.transactions.all
//   }
// }

export default connect(mapStateToProps, actions)(App);
