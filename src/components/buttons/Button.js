import React from 'react';

const Button = ({ text, className, type, handleClick }) => {

  let finalClasses = 'btn';
  if (className) {
    finalClasses = `btn ${className}`;
  } 

  return(
    <button
      className={finalClasses}
      type={type}
      onClick={handleClick ? handleClick : null}
    >
      {text}
    </button>
  )
}

export default Button;