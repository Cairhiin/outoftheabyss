import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import CoreLayout from '../layouts/CoreLayout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAllCharacters } from '../api/api';
import { getCharacters, getCharactersError, getCharactersPending } from '../store/modules/characters/reducers';
import { loadAllNotes } from '../api/api';
import { getLogs, getLogsError, getLogsPending } from '../store/modules/logbook/reducers';

const mapStateToProps = state => ({
  characters: getCharacters(state),
  charError: getCharactersError(state),
  charPending: getCharactersPending(state),
  logError: getLogsError(state),
  logs: getLogs(state),
  logPending: getLogsPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCharacters: loadAllCharacters,
    fetchNotes: loadAllNotes
}, dispatch);

class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  userIsLoggedIn = typeof localStorage !== 'undefined'
    && localStorage.token !== undefined;

  componentDidMount() {
    const { fetchNotes, fetchCharacters } = this.props;
    fetchCharacters();
    fetchNotes();
  }

  render() {
    const { store, history } = this.props
    return (
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <CoreLayout
              userIsLoggedIn = { this.userIsLoggedIn }
            />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
