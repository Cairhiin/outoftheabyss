import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { formatDate } from '../../../utils/utils';
import './Log.css';

const Log = (props) => {
  let [isToggleOn, setToggle] = useState(false);

  let { date, header, intro, footer, log, image } = props.data;
  let styles = {
    backgroundImage: image,
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: '100% auto'
  };

  return (
    <div className="display_log" onClick={ () => setToggle(!isToggleOn) } >
      <div className="display_log__header" style={ styles }>
        <div className="display_log__header__date">
          { formatDate(date) }
        </div>
        <div className="display_log__header__info">
          <div className="display_log__header__info__title">
            { header }
          </div>
          <div className="display_log__header__info__intro">
            { intro }
          </div>
        </div>
      </div>
      { isToggleOn && <div className="display_log__content">{ ReactHtmlParser(log) }</div> }
      <div className="display_log__footer">{ footer }</div>
    </div>
  );
  }


export default Log;
