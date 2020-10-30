import { Slider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InputNotched from '../components/forms/InputNotched';
import TextAreaNotched from '../components/forms/TextAreaNotched';
import Switch from '../components/forms/Switch';
import DropDown from '../components/forms/DropDown';

const CreateItem = ({ setPage, user, setErrors, setUser, history }) => {

  const [options, setOptions] = useState([{ value: 'no-stores', label: 'No Stores' }]);

  useEffect(() => {
    setPage({
      fab: {
        link: null
      }
    });
    const newOptions = [];
    user.lists.forEach(list => {
      newOptions.push({
        value: list._id,
        label: list.name
      });
    });
    setOptions(newOptions);
  }, [setPage, user.lists])

  const handleForm = async (e) => {
    e.preventDefault();
    const itemName = e.currentTarget.name.value;
    const newItem = {
      userId: user._id,
      name: itemName,
      desc: e.currentTarget.desc.value,
      price: e.currentTarget.price.value,
      url: e.currentTarget.url.value,
      imgs: [e.currentTarget.imgs.value],
      desireRank: e.currentTarget.desireRank.value,
      exactness: e.currentTarget.exactness.checked,
      listRef: [e.currentTarget.listRef.value]
    }
    // console.log(newItem);
    await fetch('/items/create', {
      method: "post",
      body: JSON.stringify(newItem),
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
      const item = data.items.find(item => item.name === itemName);
      history.push(`/users/${user._id}/items/${item._id}`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <h1>Create Item</h1>
      <form className="form-create-item" onSubmit={handleForm}>
        <InputNotched
          name="name"
          type="text"
          label="Name"
          required={true}
        />
        <TextAreaNotched
          name="desc"
          label="Description"
        />
        <InputNotched
          name="price"
          type="number"
          label="Price"
        />
        <InputNotched
          name="url"
          type="text"
          label="Item Link"
        />
        <InputNotched
          name="imgs"
          type="text"
          label="Image Link"
        />
        <div className="form-unit">
          <label className="label-basic" htmlFor="desireRank">Desire Rank</label>
          <p className="helper-text">Rate how important this item is to you!</p>
          <Slider
            id="desireRank"
            name="desireRank"
            defaultValue={7}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={10}
          />
        </div>
        <Switch
          name="exactness"
          label="Exact Match"
        />
        <DropDown
          name="listRef"
          label="Select List"
          options={options}
        />
        <button className="btn" type="submit">Create Item</button>
      </form>
    </>
  )
}

export default CreateItem;