import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconAdd from '@material-ui/icons/Add';
import PageBanner from '../components/PageBanner'
import CardWishList from '../components/CardWishList'
import Spinner from '../components/loaders/Spinner';
import { getUser } from '../utils/userServices';
import { getListCollection } from '../utils/listServices';

const WishLists = ({ user, setPgSettings }) => {

  const [lists, setLists] = useState(null)
  const [thisUser, setThisUser] = useState({})

  useEffect(() => {
    getUser(user._id, setThisUser);
  }, [user._id]);

  useEffect(() => {
    if (thisUser) {
      getListCollection(thisUser.lists, setLists);
    }
  }, [thisUser]);

  useEffect(() => {
    setPgSettings({
      fab: {
        link: '/wishlists/create',
        icon: 'plus'
      }
    })
  }, [setPgSettings]);

  if (lists === null) { return <Spinner pageCenter={true} /> }
  return (
    <>
      <PageBanner
        pageTitle='Wishlists'
        descAfter={!lists.length}
      />
      {lists.length ?
        lists.map(list => (
          <CardWishList
            key={`list-${list._id}`}
            list={list}
          />
        ))
      :
        <>
          <p className="text-white">It looks like you don't have any lists yet!</p>
          <Link className="btn btn-icon secondary" to="/wishlists/create">
            <i className="icon i-1 push-r-1-2">
              <IconAdd />
            </i>
            Add a list!
          </Link>
        </>
      }

    </>
  )
}

export default WishLists;