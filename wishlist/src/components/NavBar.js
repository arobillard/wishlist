import React from 'react';
import { NavLink } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/List';

const NavBar = () => {
  return(
    <>
      <nav id="nav" className="nav">
        <NavLink className="nav-icon-link" to="/wishlists">
          <ListIcon />
          <span className="nav-icon-label">Wishlists</span>
        </NavLink>
        <NavLink className="nav-icon-link" to="/groups">
          <GroupIcon />
          <span className="nav-icon-label">Groups</span>
        </NavLink>
      </nav>
    </>
  )
}

export default NavBar;