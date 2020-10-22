import React from 'react';

const ButtonLink = ({ url, text, addClasses }) => {

  let finalClasses = 'btn';
  if (addClasses) {
    finalClasses = `btn ${addClasses}`;
  } 

  return(
    <a
      href={url}
      className={finalClasses}
      role="button"
    >
      {text}
    </a>
  )
}

export default ButtonLink;