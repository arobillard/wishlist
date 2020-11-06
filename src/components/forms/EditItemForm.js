import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Slider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import InputNotched from './InputNotched';
import TextAreaNotched from './TextAreaNotched';
import Switch from './Switch';

const EditItemForm = ({ handleForm, item, editing }) => {

  const history = useHistory();

  const [sliderValue, setSliderValue] = useState(7);

  useEffect(() => {
    if (item) {
      setSliderValue(item.desireRank);
    }
  }, [item])

  const handleSlider = (e, value) => {
    setSliderValue(value);
  }

  const cancel = () => {
    history.goBack();
  }

  return (
    <form className="form-create-item" onSubmit={handleForm}>
        <InputNotched
          name="name"
          type="text"
          label="Name"
          required={true}
          defaultValue={item && item.name}
        />
        <TextAreaNotched
          name="desc"
          label="Description"
          defaultValue={item && item.desc}
        />
        <InputNotched
          name="price"
          type="text"
          label="Price"
          defaultValue={item && item.price}
        />
        <InputNotched
          name="url"
          type="text"
          label="Item Link"
          defaultValue={item && item.url}
        />
        <InputNotched
          name="imgs"
          type="text"
          label="Image Link"
          defaultValue={item && item.imgs}
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
          checked={item && item.exactness}
        />
        {editing ?
          <>
            <button className="btn secondary span-6" type="submit">Save</button>
            <Link className="btn span-6" onClick={cancel}>Cancel</Link>
          </>
        :
          <button className="btn secondary" type="submit">Create Item</button>
        }
      </form>
  )
}

export default EditItemForm;