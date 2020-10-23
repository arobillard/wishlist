import React, { useEffect } from 'react';
import Error from './Error';

const ErrorList = ({ errs, setErrors }) => {

  useEffect(() => {

  }, [errs])

  return(
    <div className="error-list">
      {errs.map((err, key) => (
        <Error
          key={key}
          msg={err}
          setErrors={setErrors}
          errs={errs}
        />
      ))}
    </div>
  )
}

export default ErrorList;