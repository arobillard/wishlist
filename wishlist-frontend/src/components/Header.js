import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import AccountLink from './AccountLink';
import NavBar from './NavBar';

const Header = ({ user }) => {
  return(
    <header className="masthead">
      <strong className="logo">Wishlist</strong>
      <NavBar />
      <AccountLink user={user} />
      <Fab className="fab-positioning no-btn">
        <Add />
      </Fab>
    </header>
  )
}

export default Header;