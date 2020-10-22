import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountLink = ({ user }) => {

  let userInitial = '-'
  if (user.fName) {
    userInitial = user.fName.slice(0,1);
  }

  return(
    <NavLink className="account-icon" to="/users/jesse-doe">
      {user.img ? <img src={user.img} alt={user.name} /> : <span className="account-icon-letter">{userInitial}</span>}
      <span className="account-icon-label">Account</span>
    </NavLink>
  )
}

export default AccountLink;