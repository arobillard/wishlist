import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CardWishList = ({ data, user }) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemList = user.items.filter(item => item.listRef.includes(data._id));
    setItems(itemList);
  }, [data._id, user])

  return(
    <Link className="card-wishlist" to={`/wishlists/${data._id}`}>
      <div className="card-wishlist-img"></div>
      <div className="card-wishlist-content">
        <h2>{data.name}</h2>
        <p>{items.length} item{items.length === 1 ? '' : 's'}</p>
        <div className="card-wishlist-item-prevs">
          {items.map(item => (
            <div
              key={item._id}
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