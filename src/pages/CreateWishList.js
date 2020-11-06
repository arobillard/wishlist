import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import InputNotched from '../components/forms/InputNotched';
import TextAreaNotched from '../components/forms/TextAreaNotched';
import { createList } from '../utils/listServices';
import { userAddList } from '../utils/userServices';

const CreateWishList = ({ user, setPgSettings, stateFns }) => {

  const history = useHistory();

  useEffect(() => {
    setPgSettings({
      backBtn: {
        active: true,
        link: 'back',
        prev: '/wishlists/create'
      },
      fab: {
        link: null
      }
    })
  }, [setPgSettings])

  const handleForm = async (e) => {
    e.preventDefault();
    const listName = e.currentTarget.name.value;
    const listDesc = e.currentTarget.desc.value;
    const list = {
      userId: user._id,
      name: listName,
      desc: listDesc,
    }
    const createdList = await createList(list, stateFns, history);
    userAddList(user._id, createdList._id, stateFns);
  }

  return (
    <>
      <h1>Create Wishlist</h1>
      <form onSubmit={handleForm}>
        <InputNotched
          name="name"
          type="text"
          label="Name"
          required={true}
          className="push"
        />
        <TextAreaNotched
          name="desc"
          label="Description"
          className="push"
        />
        <button className="btn" type="submit">Create Wishlist</button>
      </form>
    </>
  )
}

export default CreateWishList;