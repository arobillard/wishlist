import React, { useState, useEffect } from 'react';

const InputNotched = ({ name, type, label, required, defaultValue, className, newPassword }) => {

  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (defaultValue) {
      setValid(true);
    }
  }, [defaultValue])

  const checkValid = (e) => {
    const value = e.currentTarget.value.trim();
    value ? setValid(true) : setValid(false);
  }

  const autocomplete = () => {
    if (newPassword) {
      const value = 'new-password'
      return value;
    }
    return null;
  }

  return(
    <div className={`form-unit input-notched ${className}`}>
      <input
        onChange={checkValid}
        id={name}
        name={name}
        type={type}
        data-valid={valid}
        required={required}
        defaultValue={defaultValue ? defaultValue : null}
        autoComplete={autocomplete()}
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