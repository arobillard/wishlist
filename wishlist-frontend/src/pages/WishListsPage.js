import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardWishList from '../components/CardWishList';
import PageBanner from '../components/PageBanner';

const WishListsPage = ({ user, setPage }) => {

  const pageTitle = "WishLists"
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(user.lists)
    setPage({
      backBtn: false,
      fab: {
        icon: 'plus',
        link: '/wishlists/create'
      }
    })
  }, [setPage, user.lists])

  return(
    <>
      <PageBanner pageTitle={pageTitle} />
      {lists && lists.length
        ?
        lists.map(list => {
          return (
            <CardWishList
              key={list._id}
              data={list}
              user={user}
            />
          )
        })
        :
        <div style={{ paddingTop: '5rem', textAlign: 'center' }}>
          <p>No Wishlists yet!</p>
          <Link className="btn" to='/wishlists/create'>Add a Wishlist!</Link>
        </div>}
    </>
  )
}

export default WishListsPage;