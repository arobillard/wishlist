import React, { useEffect } from 'react';
import InputNotched from '../components/forms/InputNotched';
import TextAreaNotched from '../components/forms/TextAreaNotched';

const CreateWishList = ({ setPage, setErrors, setUser, user, history }) => {

  useEffect(() => {
    setPage({
      fab: {
        link: null
      }
    })
  }, [setPage])

  const handleForm = async (e) => {
    e.preventDefault();
    const listName = e.currentTarget.name.value;
    const listDesc = e.currentTarget.desc.value;
    const newList = {
      userId: user._id,
      name: listName,
      desc: listDesc,
    }
    await fetch('/lists/create', {
      method: "post",
      body: JSON.stringify(newList),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        setErrors(['Error: unable to create Wishlist.'])
      }
    })
    .then(data => {
      setUser(data);
      const list = data.lists.find(list => list.name === listName);
      history.push(`/wishlists/${list._id}`);
    })
    .catch(err => {
      console.log(err);
      setErrors(['Error: unable to create Wishlist.'])
    })
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