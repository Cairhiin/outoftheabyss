import React from 'react';
import { formatDateLong } from '../../utils/utils';
import './NotesList.css';

const NotesList = ({ notes }) => {

  const notesListJSX = notes.map(note => {
    const { date, header, intro, writer, _id } = note;
    return (
      <div key={ _id } className="notes_list__note_info">
        <div key={ _id } className="notes_list__note_info__background">
          <div className="notes_list__note_info__header">
            <h4>{ header }</h4>
            <span>{ writer }</span>
          </div>
          <div className="notes_list__note_info__content">
            { intro }
          </div>
          <div className="notes_list__note_info__date">
            { formatDateLong(date) }
          </div>
        </div>
      </div>
    );
  });

  return (
    <div id="notes_list">
      { notesListJSX }
    </div>
  )
}

export default NotesList;
