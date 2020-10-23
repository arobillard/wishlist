import React from 'react';
import { Link } from 'react-router-dom';

const CardWishList = ({ link, title, itemsAvailable, itemsReceived }) => {
  return(
    <Link className="card-wishlist" to={link}>
      <div className="card-wishlist-img"></div>
      <div className="card-wishlist-content">
        <h2>{title}</h2>
        <p>{itemsAvailable} items available{itemsReceived ? ` — ${itemsReceived} items received` : ''}</p>
        <div className="card-wishlist-item-prevs">
          <span className="circle-prev"></span>
          <span className="circle-prev"></span>
          <span className="circle-prev"></span>
          <span className="circle-prev"></span>
          <span className="circle-prev"></span>
          <span className="circle-prev"></span>
          <span className="circle-prev"></span>
          <span className="circle-prev"></span>
        </div>
      </div>
    </Link>
  )
}

export default CardWishList;