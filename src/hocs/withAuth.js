import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

const withAuth = WrappedComponent => {
  class AuthedComponent extends React.Component {
    state = {
      authCompleted: this.props.loggedIn
    };

    componentDidMount() {
      console.log("mounting withauth", this.props.username, this.props.userId);
      if (localStorage.getItem('token')) {
        this.props.fetchUser();
      } else {
        this.setState({ authCompleted: true });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.loggedIn) {
        this.setState({ authCompleted: true });
      }
    }

    render() {
      console.log("logged in prop", this.props.loggedIn);
      if (this.state.authCompleted) {
        return this.props.loggedIn ? (
          <WrappedComponent {...this.props} />
        ) : (
          <Redirect to="/login" />
        );
      } else {
        return <Redirect to="/" />;
      }
    }
  }

  const mapStateToProps = state => ({
    loggedIn: !!state.auth.currentUser.id,
    username: state.auth.currentUser.username,
    userId: state.auth.currentUser.id
  });

  return connect(mapStateToProps, actions)(AuthedComponent);
};

export default withAuth;
