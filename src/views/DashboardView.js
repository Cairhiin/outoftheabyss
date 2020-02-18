import React, { useState }  from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getLogs, getLogsPending, getLogsError } from '../store/modules/logbook/reducers';
import { getUsername } from '../store/modules/auth/reducers';
import { getCharacters, getCharactersPending, getCharactersError }
    from '../store/modules/characters/reducers';
import { formatDateLong } from '../utils/utils';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import DeleteButton from '../containers/DeleteButton/DeleteButton';
import { Panel, Button } from '../components/Layout/Layout';

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

  let characterJSX, notesJSX, charactersByUser, logsByUser = [];
  const [show, setShow] = useState(false);
  const [_id, setId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id);
    setShow(true);
  }

  // filter the users to only include logs written by logged in user
  if (logs) {
    logsByUser = user === 'admin' ? logs : logs.filter(log => log.writer === user);
    notesJSX = logsByUser.map(note => {
      const { date, header, intro, writer, _id } = note;
        return (
          <Col md={4} key={_id}>
            <Panel
              header={ header }
              subheader={ writer }
              content={ intro }
              footer={ formatDateLong(date) }
              styles={{ headerHeight: "85px" }}
            />
          </Col>
        );
      }
    );
  }

  if (characters) {
    charactersByUser = user === 'admin' ? characters : characters.filter(character => character.user === user);
    characterJSX = charactersByUser.map(character => {
      const { _id, charName, race, level, charClass } = character;
      const footerJSX = (
        <>
          <Link to={ `/edit-character/${ _id }`}><Button variant="default">Edit</Button></Link>
          <Button onClick={ () => handleShow(_id) } variant="default">Delete</Button>
        </>
      );
        return (
          <Col md={4} key={_id}>
            <Panel
              header={ charName }
              content={ `${ race[0].raceName } level ${ level } ${ charClass }` }
              footer={ footerJSX }
            />
          </Col>
        );
      }
    );
  }

  function shouldComponentRender() {
    if (logIsLoading === false && characterIsLoading === false) return true;
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

  return (
    <main>
      <Row>
        { characterJSX }
      </Row>
      <Row>
        { notesJSX }
      </Row>
      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Deleting cannot be undone, are you certain you want to delete this character?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Cancel
          </Button>
          <DeleteButton _id={ _id } onClick={ handleClose }>Delete</DeleteButton>
        </Modal.Footer>
      </Modal>
    </main>
  )
}

export default connect(mapStateToProps, null)(DashboardView);
