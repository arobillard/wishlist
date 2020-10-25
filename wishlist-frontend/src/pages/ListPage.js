import React, { useState, useEffect } from 'react';
import Item from '../components/Item';
import PageBanner from '../components/PageBanner';

const ListPage = ({ match, user, setPage }) => {

  const [list, setList] = useState({})
  const [items, setItems] = useState([])

  useEffect(() => {

    setPage({
      current: `/wishlist/${match.params.list}`,
      prev: '/wishlists'
    })

    const thisList = user.lists.find(aList => aList._id === match.params.list);
    setList(thisList);

    const listItems = user.items.filter(item => item.listRef.includes(list._id));
    setItems(listItems);

  }, [list._id, match.params.list, setList, setPage, user])

  return (
    <>
      <PageBanner pageTitle={list.name} desc={list.desc} />
      {items.length ? items.map(item => <Item key={item._id} item={item} user={user} />) : <p>No items in this list!</p>}
    </>
  )
}

export default ListPage;