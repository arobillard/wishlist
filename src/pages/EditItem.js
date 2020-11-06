import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import EditItemForm from '../components/forms/EditItemForm';
import { getItem, editItem } from '../utils/itemServices';

const EditItem = ({ match, user, stateFns, setPgSettings, listId }) => {

  const history = useHistory();
  const [thisItem, setThisItem] = useState(null);
  
  useEffect(() => {
    setPgSettings({
      backBtn: {
        active: true,
        link: 'back',
        prev: `/items/${match.params.id}/edit`
      },
      fab: {
        link: null
      },
      pgClass: 'edit-item'
    })
  }, [setPgSettings, match.params.id])

  useEffect(() => {
    getItem(match.params.id, setThisItem);
  }, [match.params.id])
  
  const handleForm = (e) => {
    e.preventDefault();
    const updatedItem = {
      userId: user._id,
      name: e.currentTarget.name.value,
      desc: e.currentTarget.desc.value,
      price: e.currentTarget.price.value,
      url: e.currentTarget.url.value,
      imgs: [e.currentTarget.imgs.value],
      desireRank: e.currentTarget.desireRank.value,
      exactness: e.currentTarget.exactness.checked
    }
    editItem(match.params.id, updatedItem, stateFns, history, listId)
  }

  return (
    <>
      <h1>Edit Item</h1>
      <EditItemForm
        handleForm={handleForm}
        item={thisItem}
        editing={true}
      />
    </>
  )
}

export default EditItem;