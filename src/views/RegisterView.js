import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { register } from '../api/loginApi';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';

class RegisterView extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
    this.registerUser = this.registerUser.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  async registerUser(credentials) {
    if (this._isMounted) this.setState({ hasError: false });
    const user_id = await register(credentials);
    if (user_id) {
      this.props.push('/login');
    }

    if (this._isMounted) this.setState({ hasError: true });
  }

  componentWillUnmount() {
     this._isMounted = false;
  }

  render() {
    return (
      <RegisterForm
        onSubmit={ this.registerUser }
        hasError={ this.state.hasError }
      />
    );
  }
}

export default connect(null, { push })(RegisterView);
