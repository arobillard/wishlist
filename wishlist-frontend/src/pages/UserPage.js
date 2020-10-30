import React, { useEffect } from 'react';
import Button from '../components/buttons/Button';

const UserPage = ({ match, signOut, user, setPage }) => {

  useEffect(() => {
    setPage({
      backBtn: true,
      fab: {
        icon: 'edit',
        link: `/users/${match.params.user}/edit`
      }
    })
  }, [match.params.user, setPage])

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

export default UserPage;