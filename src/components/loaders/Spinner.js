import React from 'react';

const Spinner = ({ color, pageCenter }) => {

  let classNames = "loader-circle loader-spinner";

  if (color) {
    classNames = `${classNames} ${color}`;
  } else {
    classNames = `${classNames} secondary`;
  }

  // if (pageCenter) {
  //   classNames = `${classNames} page-centered`;
  // }

  return (
    <div className={`loader-circle-wrap${ pageCenter ? ' page-centered' : null}`}>
      <svg className={classNames} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="32" strokeMiterlimit="10" />
      </svg>
    </div>
  )
}

export default Spinner;