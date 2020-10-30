import React from 'react';

const DropDown = ({ name, label, options }) => {
  return (
    <div className="form-unit">
      <label htmlFor={name} className="label-basic">{label}</label>
      <select name={name} id={name}>
        {options.map((option, key) => (
          <option key={`${key}-${option.value}`} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default DropDown;