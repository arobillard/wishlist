import React, { useEffect, useState } from 'react';
import CardWishList from '../components/CardWishList';
import PageBanner from '../components/PageBanner';

const WishListsPage = ({ user, setPage }) => {

  const pageTitle = "WishLists"
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(user.lists)
    setPage({
      current: '/wishlist'
    })
  }, [setPage, user.lists])

  return(
    <>
      <PageBanner pageTitle={pageTitle} />
      {lists && lists.length ? lists.map(list => {
        return (
          <CardWishList
            key={list._id}
            data={list}
          />
        )
      }) : null}
    </>
  )
}

export default WishListsPage;