import React from 'react';

const PopUpConfirm = ({ active, closeFn, confirmFn, confirmText, title, text }) => {

  if (active) {
    return (
      <div className="pop-up-wrap">
        <div className="pop-up">
          {title ? <h2>{title}</h2> : null}
          <p>{text}</p>
          <button onClick={confirmFn}>{confirmText}</button>
          <button onClick={closeFn}>Cancel</button>
        </div>
      </div>
    )
  }
  return null;
}

export default PopUpConfirm;