import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from '../../containers/DeleteButton/DeleteButton';
import { Modal, Button } from 'react-bootstrap';
import './CharList.css';

const CharList = ({ characters }) => {
  const [show, setShow] = useState(false);
  const [_id, setId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id);
    setShow(true);
  }

  const characterList = characters.map(character => {
    const { _id, charName, race, level, charClass } = character;
    return (
      <div key={ _id } className="charlist__char_info">
        <div className="charlist__char_info__header">
          { charName }
        </div>
        <div className="charlist__char_info__content">
          { race[0].raceName } level { level } { charClass }
        </div>
        <div className="charlist__char_info__buttons">
          <Button to={ `/edit-character/${ _id }`} as={ Link }>Edit</Button>
          <Button onClick={ () => handleShow(_id) }>Delete</Button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div id="charlist">
        { characterList }
      </div>
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
    </div>
  );
}

export default CharList;
