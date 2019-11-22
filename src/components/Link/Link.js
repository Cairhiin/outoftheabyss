import React from 'react';
import './Link.css';

const Link = ({ customClass, children, onClick }) => {
  const custom = "link " + customClass;
  return (
    <div className={ custom } onClick={ onClick }>
      { children }
    </div>
  );
}

export default Link;
