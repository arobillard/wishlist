import React from 'react';
import { ArrowForwardIos } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
  return (
    <div className={`card card-item full-link`}>
      <img className="card-image" src={item.imgs[0]} alt={item.name} />
      <div className="card-text truncate">
        <h2 className="card-title truncate push-0">{item.name}</h2>
        <p className="card-desc text-small truncate push-0">{item.desc}</p>
      </div>
      <Link
        className="card-link flex-v-center"
        to={`/items/${item._id}`}
      >
        <ArrowForwardIos />
      </Link>
    </div>
  )
}

export default Item;