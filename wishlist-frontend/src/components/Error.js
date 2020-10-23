import React from 'react';
import { Close } from '@material-ui/icons';

const Error = ({ msg, setErrors, errs }) => {

  const clear = () => {
    let errsList = [
      ...errs.slice(0, errs.indexOf(msg)),
      ...errs.slice(errs.indexOf(msg) + 1, errs.length)
    ];
    
    setErrors(errsList);
  }

  return(
    <div className="error">
      <strong>{msg}</strong>
      <button className="no-btn" onClick={clear}><Close /></button>
    </div>
  )
}

export default Error;