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
    <header className="account-header full-width">
      <div className="account-header-title-wrap">
        <h1>{user.fName} {user.lName}</h1>
      </div>
      <div className="account-header-img-wrap">
        <img src={user.img ? user.img : 'https://placehold.it/100x100'} alt={`${user.fName} ${user.lName}`}/>
        <a href={`mailto:${user.email}`} className="account-email">{user.email}</a>
      </div>
    </header>
      <Button
        className="col-2-center"
        text="Log Out"
        handleClick={signOut}
      />
    </>
  )
}

export default Account;