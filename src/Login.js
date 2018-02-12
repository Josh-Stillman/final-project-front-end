import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from './actions';
import {Container, Header} from 'semantic-ui-react'
import withAuth from './hocs/withAuth'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { fields: { username, password } } = this.state;
    this.props.loginUser(username, password, this.props.history);
  };

  logOut = (event) => {
    event.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { fields } = this.state;
    return (
      <div>
      <Container>
      <Header as="h1">Login</Header>
        {this.state.error ? <h1>Try Again</h1> : null}
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Username</label>
              <input
                name="username"
                placeholder="username"
                value={fields.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic green button">
              Login
            </button>
          </form>
        </div>
        </Container>
        <h1>{this.props.loggedIn ? <div>You are logged in, {this.props.username} with id of {this.props.userId}<button onClick={this.logOut}>log out</button></div> : "You are not logged in"}</h1>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  username: state.auth.currentUser.username,
  userId: state.auth.currentUser.id
});

export default withRouter(connect(mapStateToProps, actions)(Login));
