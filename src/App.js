import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './NavBar'
import TransactionsContainer from './containers/TransactionsContainer'
import BusinessesContainer from './containers/BusinessesContainer'
import HomePage from './HomePage'
import Analytics from './Analytics'
import { Container} from 'semantic-ui-react'
import * as actions from './actions'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount(){
    this.props.fetch_transactions()
    this.props.fetch_businesses()
    console.log("app mounting", this.props);
  }

  render() {
    return (
      <Router>
        <div>
        <NavBar />
        <Container >
        <Route exact path="/" component={HomePage} />
        <Route path="/transactions" component={TransactionsContainer} />
        <Route path="/businesses" component={BusinessesContainer} />
        <Route path="/analytics" component={Analytics} />
        </Container>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    transactions: state.transactions.all
  }
}

// const mapDispatchToProps = (dispatch) =>{
//   return {
//     transactions: state.transactions.all
//   }
// }

export default connect(mapStateToProps, actions)(App);
