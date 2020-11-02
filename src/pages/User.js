import React, { useEffect, useState } from 'react';
import Button from '../components/buttons/Button';

const User = ({ match, stateFns }) => {

  const [thisUser, setThisUser] = useState({
    fName: 'Adam',
    lName: 'Robillard',
    email: 'my@email.com',
    img: false,
  })

  useEffect(() => {
    
  }, [])

  return(
    <>
    <header className="account-header full-width">
      <div className="account-header-title-wrap">
        <h1>{thisUser.fName} {thisUser.lName}</h1>
      </div>
      <div className="account-header-img-wrap">
        <img src={thisUser.img ? thisUser.img : 'https://placehold.it/100x100'} alt={`${thisUser.fName} ${thisUser.lName}`}/>
        <a href={`mailto:test@tes.com`} className="account-email">{thisUser.email}</a>
      </div>
    </header>
      <Button
        className="col-2-center"
        text="Log Out"
        // handleClick={signOut}
      />
    </>
  )
}

export default User;