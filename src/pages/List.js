import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import Item from '../components/Item';
import Spinner from '../components/loaders/Spinner';
import { getList } from '../utils/listServices';
import { getItemCollection } from '../utils/itemServices';

const List = ({ match, stateFns, setPgSettings }) => {

  const [thisList, setThisList] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setPgSettings({
      backBtn: {
        active: true,
        link: '/wishlists',
        prev: `/wishlists/${match.params.list}`
      },
      fab: {
        icon: 'add',
        link: '/items/create'
      }
    });
  }, [setPgSettings, match.params.list])

  useEffect(() => {
    stateFns.setListId(match.params.list);
    localStorage.setItem('listId', JSON.stringify(match.params.list))
  }, [match.params.list, stateFns])

  useEffect(() => {
    getList(match.params.list, setThisList);
  }, [match])

  useEffect(() => {
    if (thisList && thisList.items.length) {
      getItemCollection(thisList.items, setItems);
    }
  }, [thisList])

  if (thisList === null) {
    return <Spinner pageCenter={true} />
  } else if (thisList === false || undefined) {
    return <h1>Sorry, user does not exist</h1>
  }
  return (
    <>
      <PageBanner pageTitle={thisList.name} desc={thisList.desc}  />
      {items.length ? items.map(item => <Item key={item._id} item={item} listId={thisList._id} />) : <p>No items in this list!</p>}
    </>
  )
}

export default List;