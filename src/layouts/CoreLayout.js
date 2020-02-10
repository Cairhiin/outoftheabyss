import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Switch, Route, Link } from "react-router-dom";
import Logbook from '../views/LogbookView';
import Characters from '../views/CharactersView';
import NPCs from '../views/NPCView';
import Login from '../views/authentication/LoginView';
import Logout from '../views/authentication/LogoutView';
import Register from '../views/authentication/RegisterView';
import Dashboard from '../views/DashboardView';
import EditCharacter from '../views/character/EditCharView';
import { getUsername, getIsLoggedIn } from '../store/modules/auth/reducers';
import { connect } from 'react-redux';
import { logUser } from '../store/modules/auth/actions';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  username: getUsername(state)
});

const mapDispatchToProps = dispatch => {
  return {
      logUser: user => dispatch(logUser(user)),
  }
}

class CoreLayout extends Component {

  componentDidMount() {
    if (this.props.userIsLoggedIn) {
      this.props.logUser(localStorage.username);
    }
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Navbar expand="lg">
            <Container>
              <Navbar.Brand as={ Link } to="/">Out of the Abyss</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={ Link } to="/characters">Characters</Nav.Link>
                  <Nav.Link as={ Link } to="/npcs">NPCs</Nav.Link>
                </Nav>
                <Nav>
                  { !this.props.isLoggedIn &&
                    <Nav.Link as={ Link } to="/login">Login</Nav.Link>
                  }
                  { !this.props.isLoggedIn &&
                    <Nav.Link as={ Link } to="/register">Register</Nav.Link>
                  }
                  { this.props.isLoggedIn &&
                      <Nav.Link as={ Link } to="/logout">Logout { this.props.username }</Nav.Link>
                  }
                  { this.props.isLoggedIn &&
                      <Nav.Link as={ Link } to="/dashboard">Dashboard</Nav.Link>
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
        <Container id="main">
          <Switch>
            <Route exact path="/">
              <Logbook />
            </Route>
            <Route path="/characters">
              <Characters />
            </Route>
            <Route path="/npcs">
              <NPCs />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/edit-character/:charId" component={ EditCharacter } />
            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
          </Switch>
        </Container>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
