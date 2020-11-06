import React from 'react';
// import { Fab } from '@material-ui/core';
import { Add, ArrowBack, Create, Save } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import AccountLink from './AccountLink';
import NavBar from './NavBar';

const Header = ({ user, pgSettings }) => {

  const history = useHistory();

  const fabIcon = () => {
    if (pgSettings.fab && pgSettings.fab.icon === 'edit') {
      return <Create />
    } else if (pgSettings.fab.icon === 'save') {
      return <Save />
    }
    return <Add />
  }

  const goBack = () => {
    if (pgSettings.backBtn.link === 'back') {
      history.goBack();
    } else {
      history.push({
        pathname: pgSettings.backBtn.link,
        state: { prev: pgSettings.backBtn.prev }
      });
    }
  }

  const backArrow = () => (
    <button className='no-btn no-focus flex-v-center push-r-1-2' onClick={goBack}>
      <ArrowBack />
    </button>
  )

  return(
    <header className="masthead">
      {pgSettings.backBtn && backArrow()}
      <strong className="logo">Wishlist</strong>
      <NavBar className={pgSettings.fab && pgSettings.fab.link === null ? 'no-fab' : null} />
      <AccountLink user={user} />
      {pgSettings.fab && pgSettings.fab.link
      ?
      <Link className="fab fab-positioning no-btn" to={pgSettings.fab.link}>
        {fabIcon()}
      </Link>
      :
      null}
    </header>
  )
}

export default Header;