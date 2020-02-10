import React from 'react';
import PropTypes from 'prop-types';
import './Link.css';

const Link = ({ active, customClass, children, onClick }) => {
  const custom = active ? "link " + customClass  + " active-link" : "link " + customClass;
  return (
    <div className={ custom } onClick={ onClick }>
      { children }
    </div>
  );
}

Link.propTypes = {
  active: PropTypes.bool,
  customClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}

export default Link;
