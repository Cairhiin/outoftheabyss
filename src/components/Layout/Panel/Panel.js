import React from 'react';
import PropTypes from 'prop-types';
import './Panel.css';

const Panel = ({
  header,
  subheader,
  content,
  footer,
  customClass="default",
  styles={ headerHeight: 'inherit' }
}) => {
  /**
    styles must be an object
    only supports setting a height for the Header element for now
    can be expanded upon in case other flexibility is needed
  */
  return (
    <div className={ `panel ${ customClass }` }>
      <div className="panel__header" style={{ minHeight: styles.headerHeight }}>
        <h4>{ header }</h4>
        { subheader &&
          <span>{ subheader }</span>
        }
      </div>
      <div className="panel__content">
        { content }
      </div>
      <div className="panel__footer">
        { footer }
      </div>
    </div>
  );
}

Panel.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  content: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  styles: PropTypes.object
};

export default Panel;
