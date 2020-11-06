import React, { useEffect, useState } from 'react';
import Button from '../components/buttons/Button';
import { getUser } from '../utils/userServices';

const User = ({ match, stateFns, user, setPgSettings }) => {

  const [thisUser, setThisUser] = useState(null)

  useEffect(() => {
    getUser(match.params.user, setThisUser);
  }, [match])

  useEffect(() => {
    setPgSettings({
      backBtn: {
        active: true,
        link: 'back',
        prev: `/users/${match.params.user}`
      },
      fab: {
        link: null
      },
      pgClass: 'user'
    })
  }, [setPgSettings, match.params.user])

  const signOut = () => {
    stateFns.setUser(null);
  }

  if (thisUser === null) {
    return <h1>Loading User</h1>
  } else if (thisUser === false || undefined) {
    return <h1>Sorry, user does not exist</h1>
  }
  return(
    <>
      <header className="account-header full-width">
        <div className="account-header-title-wrap">
          <h1>{thisUser.fName} {thisUser.lName}</h1>
        </div>
        <div className="account-header-img-wrap">
          <img src={thisUser.img ? thisUser.img : 'https://placehold.it/100x100'} alt={`${thisUser.fName} ${thisUser.lName}`}/>
          <a href={`mailto:${thisUser.email}`} className="account-email">{thisUser.email}</a>
        </div>
      </header>
      {user._id === thisUser._id ?
        <>
          <Button
            className="col-2-center"
            text="Log Out"
            handleClick={signOut}
          />
        </>
      : null}
    </>
  )
}

export default User;