import React, { useState } from 'react';

const InputNotched = ({ name, type, label, required, className }) => {

  const [valid, setValid] = useState(false)

  const checkValid = (e) => {
    const value = e.currentTarget.value.trim();
    value ? setValid(true) : setValid(false);
  }

  return(
    <div className={`form-unit input-notched ${className}`}>
      <input
        onChange={checkValid}
        id={name}
        name={name}
        type={type}
        pattern="\S+"
        data-valid={valid}
        required={required}
      />
      <div className="notched-wrap">
        <div className="notched-pre"></div>
        <div className="notched-label">
          <label
            className="label-basic"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
        <div className="notched-post"></div>
      </div>
    </div>
  )
}

export default InputNotched;