import React, { useState, useEffect } from 'react';

const TextAreaNotched = ({ name, label, required, defaultValue, className }) => {

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

  return (
    <div className={`form-unit input-notched ${className}`}>
      <textarea
        id={name}
        name={name}
        required={required}
        data-valid={valid}
        onChange={checkValid}
        defaultValue={defaultValue ? defaultValue : null}
      >
      </textarea>
      <div className="notched-wrap">
        <div className="notched-pre"></div>
        <div className="notched-label">
          <label className="label-basic" htmlFor={name}>{label}</label>
        </div>
        <div className="notched-post"></div>
      </div>
    </div>
  )
}

export default TextAreaNotched;