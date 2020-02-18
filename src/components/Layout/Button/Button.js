import React from 'react';
import './Button.css';

const Button = ({ children, variant, onClick }) => {
  return (
    <button
      className={ `button ${ variant }` }
      onClick={ onClick }
    >
      { children }
    </button>
  );
}

export default Button;
