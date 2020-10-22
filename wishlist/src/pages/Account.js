import React, { useEffect } from 'react';
import Button from '../components/buttons/Button';

const Account = ({ match, signOut, user }) => {

  useEffect(() => {
    // setUser(match.params.user);
    // const fetchData = async () => {
    //   fetch(`/api/test`)
    //     .then((res) => {
    //       if(res.ok) {
    //         return res.json();
    //       } else {
    //         throw new Error('Didn\' work!')
    //       }
    //     })
    //     .then((resData) => {
    //       setData(resData);
    //       console.log('resData');
    //       console.log(resData);
    //     })
    //     .catch((err) => {
    //       console.log(('ERROR: ', err.message));
    //     })
    // }
    // fetchData();
  }, [match])

  return(
    <>
      <h1>{user.fName}</h1>
      <Button
        className="col-2-center"
        text="Log Out"
        handleClick={signOut}
      />
    </>
  )
}

export default Account;