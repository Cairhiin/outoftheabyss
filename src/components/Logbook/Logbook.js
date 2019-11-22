import React from 'react';
import Log from './Log/Log';
import './Logbook.css';

const Logbook = ({ data }) => {
  let logbookJSX;
  if (data) {
    logbookJSX = data.map((log, key) => <Log key={ key } data={ log } />);
  }

  return (
    <div id="display__logbook">
      { logbookJSX }
    </div>
  );
}

export default Logbook;
