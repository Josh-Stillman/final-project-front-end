import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from './actions';
import {Form, Button, Message, Container, Header} from 'semantic-ui-react'
import withAuth from './hocs/withAuth'
import {API_ROOT} from './api-config'

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      errorMessages: "",
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

  signUp = (fields) => {
    console.log("in signup, fields are", fields);
    fetch(`${API_ROOT}/signup/`, {
      method: 'POST',
      headers:
        {'Content-Type': 'application/json',
        'Accepts': 'application/json'}
      ,
      body: JSON.stringify(fields)
    }).then(res => res.json())
    .then(json => {console.log(json);
      json.errors ? this.setState({error: true, errorMessages: json.errors}) : this.props.history.push("/login")
      }
    );
  };


  render() {
    const { fields } = this.state;
    return (

      <Container>
      <Form warning={this.state.error} onSubmit={() => this.signUp(this.state.fields)}>
        <Header as="h1">Sign Up</Header>
        <Form.Input label='User Name' name="username" placeholder='username' value={fields.username} onChange={this.handleChange} />
        <Form.Input label='Password' name="password" type="password" placeholder="password" value={fields.password} onChange={this.handleChange} />
        <Button type="submit">Submit</Button>
        <Message
        warning
        header='Error'
        list={this.state.errorMessages}
    />
          </Form>

        </Container>

    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  username: state.auth.currentUser.username,
  userId: state.auth.currentUser.id
});

export default withRouter(connect(mapStateToProps, actions)(SignUp));
