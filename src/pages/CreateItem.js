import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import EditItemForm from '../components/forms/EditItemForm';
import { createItem } from '../utils/itemServices';
import { userAddItem } from '../utils/userServices';
import { listAddItem } from '../utils/listServices';

const CreateItem = ({ user, stateFns, setPgSettings, listId }) => {

  const history = useHistory();

  useEffect(() => {
    setPgSettings({
      backBtn: {
        active: true,
        link: 'back',
        prev: '/items/create'
      },
      fab: {
        link: null
      },
      pgClass: 'create-item'
    })
  }, [setPgSettings])

  const handleForm = async (e) => {
    e.preventDefault();
    const newItem = {
      userId: user._id,
      name: e.currentTarget.name.value,
      desc: e.currentTarget.desc.value,
      price: e.currentTarget.price.value,
      url: e.currentTarget.url.value,
      imgs: [e.currentTarget.imgs.value],
      desireRank: e.currentTarget.desireRank.value,
      exactness: e.currentTarget.exactness.checked
    }
    const createdItem = await createItem(newItem, stateFns, history, listId);
    userAddItem(user._id, createdItem._id, stateFns);
    listAddItem(listId, createdItem._id, stateFns);
  }

  return (
    <>
      <h1>Create Item</h1>
      <EditItemForm
        handleForm={handleForm}
      />
    </>
  )
}

export default CreateItem;