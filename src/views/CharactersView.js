import React, { useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import Sidebar from '../components/Sidebar/Sidebar';
import Character from '../components/Character/Character';
import { connect } from 'react-redux';
import { getCharacters, getCharactersPending, getCharactersError }
    from '../store/modules/characters/reducers';

const mapStateToProps = (state) => ({
  characters: getCharacters(state),
  isLoading: getCharactersPending(state),
  error: getCharactersError(state),
});

const CharactersView = ({ characters, isLoading, error }) => {

  const [character, setCharacter] = useState(characters[0]);

  function handleClick(character) {
    setCharacter(character);
  }

  function shouldComponentRender() {
      if (isLoading === false) return true;
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

  const formatHeaders = (character) => {
      return character.charName;
  }

  const formatSubHeaders = (character) => {
      return character.charClass + " " + character.level;
  }

  return (
    <Row>
      { /* sidebar */ }
      <Col md={3}>
        <Sidebar
          items = { characters }
          headers = { formatHeaders }
          subheaders = { formatSubHeaders }
          onClick = { handleClick }
        />
      </Col>
      { /* main content */ }
      <Col md={9}>
        <main>
          { !error ?
              <Character character = { character || characters[0] } /> :
              <div>{ error }</div>
          }
        </main>
      </Col>
    </Row>
  );
}

export default connect(mapStateToProps, null)(CharactersView);
