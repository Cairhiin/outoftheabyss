import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../store/modules/auth/actions';

const mapDispatchToProps = dispatch => {
  return {
      logoutUser: user => dispatch(logoutUser())
  }
}

class LogoutView extends Component {

  componentDidMount() {
    if (typeof localStorage !== 'undefined' &&
      localStorage.token) {
        delete localStorage.token;
        delete localStorage.username;
        delete localStorage.role;
        this.props.logoutUser();
      }
  }
  render() {
    return (
      <Row>
        <Col md={12}>
          <main>
            <p>You've successfully logged out!</p>
          </main>
        </Col>
      </Row>
    )
  }
}

export default connect(null, mapDispatchToProps)(LogoutView);
