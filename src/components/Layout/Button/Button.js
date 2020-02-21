import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant="default",
  size="normal",
  onClick,
  dropShadow=false,
  customClass
}) => {
  let classes = `button ${ variant } ${ size } ${ customClass }`;
  classes = dropShadow ? classes += ' drop-shadow' : classes;

  return (
    <button
      className={ classes }
      onClick={ onClick }
    >
      { children }
    </button>
  );
}

export default Button;
