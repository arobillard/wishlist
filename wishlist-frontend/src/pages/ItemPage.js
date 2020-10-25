import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';

const ItemPage = ({ user, match, setPage }) => {

  const [item, setItem] = useState({});

  useEffect(() => {
    const thisItem = user.items.find(aItem => aItem._id === match.params.item);
    console.log(item.imgs)
    setItem(thisItem);
  }, [item.imgs, match.params.item, user.items])

  return (
    <>
      <PageBanner
        pageTitle={item.name}
        descAfter={true}
        img={item.imgs ? item.imgs[0] : null }
      />
      <p>{item.desc}</p>
    </>
  )
}

export default ItemPage;