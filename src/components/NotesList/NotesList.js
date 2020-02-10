import React from 'react';
import './NotesList.css';

const NotesList = ({ notes }) => {

  const notesListJSX = notes.map(note => {
    const { date, header, intro, writer, _id } = note;
    return (
      <div key={ _id } className="notes_list__note_info">
        <div className="notes_list__note_info__header">
          { header }
          <span>{ writer }</span>
        </div>
        <div className="notes_list__note_info__content">
          { intro }
        </div>
        <div className="notes_list__note_info__date">
          { date }
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
