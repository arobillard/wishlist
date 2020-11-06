import { get } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItemCollection } from '../utils/itemServices';

const CardWishList = ({ list }) => {

  const [items, setItems] = useState([])
  useEffect(() => {
    getItemCollection(list.items, setItems)
  }, [list])

  return(
    <Link className="card-wishlist" to={`/wishlists/${list._id}`}>
      <div className="card-wishlist-img"></div>
      <div className="card-wishlist-content">
        <h2>{list.name}</h2>
        <p>{items.length} item{items.length === 1 ? '' : 's'}</p>
        <div className="card-wishlist-item-prevs">
          {items.map((item, key) => (
            <div
              key={`item-${key}`}
              className="circle-prev"
              style={item.imgs ? { backgroundImage: 'url(' + item.imgs[0] + ')' } : null }
            ></div>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default CardWishList;