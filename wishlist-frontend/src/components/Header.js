import { Fab } from '@material-ui/core';
import { Add, ArrowBack } from '@material-ui/icons';
import React from 'react';
import AccountLink from './AccountLink';
import NavBar from './NavBar';

const Header = ({ user, page }) => {

  // const backArrow = () => (
  //   <Link className='flex-v-center push-r-1-2' to={page.prev}>
  //     <ArrowBack />
  //   </Link>
  // )

  const goBack = () => {
    window.history.back();
  }

  const backArrow = () => (
    <button className='no-btn flex-v-center push-r-1-2' onClick={goBack}>
      <ArrowBack />
    </button>
  )

  return(
    <header className="masthead">
      {page.prev && backArrow()}
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