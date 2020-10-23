import React from 'react';
import CardWishList from '../components/CardWishList';
import PageBanner from '../components/PageBanner';

const WishListsPage = () => {

  const pageTitle = "WishLists"

  return(
    <>
      <PageBanner pageTitle={pageTitle} />
      <CardWishList
        link="/"
        title="Christmas 2020"
        itemsAvailable={10}
        itemsReceived={2}
      />
      <CardWishList
        link="/"
        title="Office Secret Santa"
        itemsAvailable={3}
      />
      <CardWishList
        link="/"
        title="28th Birthday"
        itemsAvailable={6}
        itemsReceived={2}
      />
    </>
  )
}

export default WishListsPage;