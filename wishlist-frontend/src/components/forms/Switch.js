import React from 'react';

const Switch = ({ name, label, checked }) => {
  return (
    <div className="switch-wrap">
      <label className="switch" htmlFor={name}>
        <span className="switch-label">{label}</span>
        <input id={name} name={name} type="checkbox" defaultChecked={checked} />
        <span className="switch-toggle"></span>
      </label>
    </div>
  )
}

export default Switch;