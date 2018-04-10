import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from './actions';
import {Container, Header, Message, Form, Button} from 'semantic-ui-react'
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
    console.log("user is", this.props.user);
    const { fields } = this.state;
    return (

      <Container>
      <Header as="h1">Login</Header>
        {this.state.error ? <h1>Try Again</h1> : null}

          <Form warning={this.props.user.error} onSubmit={this.handleSubmit}>
          <Form.Input label='User Name' name="username" placeholder='username' value={fields.username} onChange={this.handleChange} />
          <Form.Input label='Password' name="password" type="password" placeholder="password" value={fields.password} onChange={this.handleChange} />
          <Button type="submit">Login</Button>
          <Message warning header='Error' content={this.props.user.error}/>
          </Form>

        </Container>



    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  user: state.auth.currentUser,
  username: state.auth.currentUser.username,
  userId: state.auth.currentUser.id
});

export default withRouter(connect(mapStateToProps, actions)(Login));

        // <h1>{this.props.loggedIn ? <div>You are logged in, {this.props.username} with id of {this.props.userId}<button onClick={this.logOut}>log out</button></div> : "You are not logged in"}</h1>
