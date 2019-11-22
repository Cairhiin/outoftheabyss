import React  from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import Logbook from '../components/Logbook/Logbook';
import Character from '../components/Character/Character';
import { connect } from 'react-redux';
import { getLogs, getLogsPending, getLogsError } from '../store/modules/logbook/reducers';
import { getUsername } from '../store/modules/auth/reducers';
import { getCharacters, getCharactersPending, getCharactersError }
    from '../store/modules/characters/reducers';

const mapStateToProps = (state) => ({
  logs: getLogs(state),
  logIsLoading: getLogsPending(state),
  logError: getLogsError(state),
  user: getUsername(state),
  characters: getCharacters(state),
  characterIsLoading: getCharactersPending(state),
  characterError: getCharactersError(state)
});

const DashboardView = ({ logs, logIsLoading, logError,
  user, characters, characterIsLoading, characterError }) => {

  // filter the users to only include logs written by logged in user
  let logsByUser = logs.filter(log => log.writer === user);
  let charactersByUser = logs.filter(character => character.name === user);

  function shouldComponentRender() {
    if (logIsLoading === false) return true;
    return false;
  }

  if (!shouldComponentRender()) {
    return (
      <Row>
        <Col md={12}>
          <div className="spinner">
            <Spinner animation="border" role="status" variant="secondary" size="lg">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </Col>
      </Row>
    );
  }

  // Temp - needs implementation of LogList and CharacterList containers
  return (
    <Row>
      <Col md={12}>
        <main>
          { (!characterError && charactersByUser.length > 0) ? <Character character = { charactersByUser } /> :
            <div>{ characterError }</div>
          }
          { !logError ? <Logbook data={ logsByUser } /> :
              <div>{ logError }</div>
          }
        </main>
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, null)(DashboardView);
