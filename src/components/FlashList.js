import React from 'react';
import { Close } from '@material-ui/icons';

const FlashList = ({ flashes, setFlashes }) => {

  return(
    <div className="error-list">
      {flashes.map((flash, key) => {

        const clear = () => {
          let flashList = [
            ...flashes.slice(0, flashes.indexOf(flash)),
            ...flashes.slice(flashes.indexOf(flash) + 1, flashes.length)
          ];
          setFlashes(flashList);
        }

        return (
        <div key={`flash-${key}`} className={`flash ${flash.type}`}  onClick={clear}>
          <strong>{flash.msg}</strong>
          <button className="no-btn"><Close /></button>
        </div>
        )
      })}
    </div>
  )
}

export default FlashList;