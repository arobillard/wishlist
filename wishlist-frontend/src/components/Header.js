import React from 'react';
import { Fab } from '@material-ui/core';
import { Add, ArrowBack, Create, Save } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AccountLink from './AccountLink';
import NavBar from './NavBar';

const Header = ({ user, page }) => {

  // const backArrow = () => (
  //   <Link className='flex-v-center push-r-1-2' to={page.prev}>
  //     <ArrowBack />
  //   </Link>
  // )

  const fabIcon = () => {
    if (page.fab.icon === 'edit') {
      return <Create />
    } else if (page.fab.icon === 'save') {
      return <Save />
    }
    return <Add />
  }

  const goBack = () => {
    window.history.back();
  }

  const backArrow = () => (
    <button className='no-btn no-focus flex-v-center push-r-1-2' onClick={goBack}>
      <ArrowBack />
    </button>
  )

  return(
    <header className="masthead">
      {page.backBtn && backArrow()}
      <strong className="logo">Wishlist</strong>
      <NavBar className={page.fab.link === null ? 'no-fab' : null} />
      <AccountLink user={user} />
      {/* <Fab className="fab-positioning no-btn" href={page.fab.link}>
        {fabIcon()}
      </Fab> */}
      {page.fab.link
      ?
      <Link className="fab fab-positioning no-btn" to={page.fab.link}>
        {fabIcon()}
      </Link>
      :
      null}
    </header>
  )
}

export default Header;