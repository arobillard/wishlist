import React from 'react';
import { NavLink } from 'react-router-dom';
import slugify from 'slugify';

const AccountLink = ({ user }) => {

  let userInitial = '-'
  if (user.fName) {
    userInitial = user.fName.slice(0,1);
  }

  let userLink = slugify(`${user.fName} ${user.lName}`, { lower: true });

  return(
    <NavLink className="account-icon" to={`/users/${userLink}`}>
      {user.img ? <img src={user.img} alt={user.name} /> : <span className="account-icon-letter">{userInitial}</span>}
      <span className="account-icon-label">Account</span>
    </NavLink>
  )
}

export default AccountLink;