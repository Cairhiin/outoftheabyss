import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { login } from '../api/loginApi';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import { logUser } from '../store/modules/auth/actions';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return {
      logUser: user => dispatch(logUser(user)).then(dispatch(push('/dashboard')))
  }
}

class LoginView extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  async loginUser(credentials) {
    if (this._isMounted) this.setState({ hasError: false });
    const user = await login(credentials);

    if (user) {
      const { username, token, role } = user;
      if (credentials.stayLoggedIn) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
      }
      this.props.logUser(user.username)
      return;
    }

    if (this._isMounted) this.setState({ hasError: true });
    return false;
  }

  componentWillUnmount() {
     this._isMounted = false;
  }

  render() {
    return (
      <LoginForm
        onSubmit={ this.loginUser }
        hasError={ this.state.hasError }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
