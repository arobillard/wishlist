import { Slider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InputNotched from '../components/forms/InputNotched';
import TextAreaNotched from '../components/forms/TextAreaNotched';
import Switch from '../components/forms/Switch';
import DropDown from '../components/forms/DropDown';

const EditItem = ({ setPage, user, errors, setErrors, setUser, history, match }) => {

  const [item, setItem] = useState({});
  const [options, setOptions] = useState([{ value: 'no-stores', label: 'No Stores' }]);
  const [sliderValue, setSliderValue] = useState(7);
  
  useEffect(() => {
    setPage({
      backBtn: true,
      fab: {
        link: null
      }
    });

    const thisItem = user.items.find(aItem => aItem._id === match.params.item);
    setItem(thisItem);

    const newOptions = [];
    user.lists.forEach(list => {
      newOptions.push({
        value: list._id,
        label: list.name
      });
    });
    setOptions(newOptions);
  }, [match.params.item, setPage, user.items, user.lists])

  const handleForm = async (e) => {
    e.preventDefault();
    const itemName = e.currentTarget.name.value;
    const updatedItem = {
      userId: user._id,
      itemId: match.params.item,
      name: itemName,
      desc: e.currentTarget.desc.value,
      price: e.currentTarget.price.value,
      url: e.currentTarget.url.value,
      imgs: [e.currentTarget.imgs.value],
      desireRank: e.currentTarget.desireRank.value,
      exactness: e.currentTarget.exactness.checked,
      listRef: [e.currentTarget.listRef.value],
      status: item.status
    }
    console.log(updatedItem);
    await fetch('/items/update', {
      method: "post",
      body: JSON.stringify(updatedItem),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        setErrors(['Error: unable to edit item.'])
      }
    })
    .then(data => {
      if (!errors.length) {
        setUser(data);
        const item = data.items.find(item => item.name === itemName);
        history.push(`/users/${user._id}/items/${item._id}`);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleSlider = (e, value) => {
    setSliderValue(value);
  }

  return (
    <>
      <h1>Edit Item</h1>
      <form className="form-create-item" onSubmit={handleForm}>
        <InputNotched
          name="name"
          type="text"
          label="Name"
          required={true}
          defaultValue={item.name}
        />
        <TextAreaNotched
          name="desc"
          label="Description"
          defaultValue={item.desc}
        />
        <InputNotched
          name="price"
          type="number"
          label="Price"
          defaultValue={item.price}
        />
        <InputNotched
          name="url"
          type="text"
          label="Item Link"
          defaultValue={item.url}
        />
        <InputNotched
          name="imgs"
          type="text"
          label="Image Link"
          defaultValue={item.imgs}
        />
        <div className="form-unit">
          <label className="label-basic" htmlFor="desireRank">Desire Rank</label>
          <p className="helper-text">Rate how important this item is to you!</p>
          <Slider
            id="desireRank"
            name="desireRank"
            value={sliderValue}
            onChange={handleSlider}
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
          checked={item.exactness}
        />
        <DropDown
          name="listRef"
          label="Select List"
          options={options}
          default={item.listRef}
        />
        <button className="btn" type="submit">Update Item</button>
      </form>
    </>
  )
}

export default EditItem;