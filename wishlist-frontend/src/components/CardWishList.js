import React from 'react';
import { Link } from 'react-router-dom';

const CardWishList = ({ data }) => {
  return(
    <Link className="card-wishlist" to={`/wishlists/${data._id}`}>
      <div className="card-wishlist-img"></div>
      <div className="card-wishlist-content">
        <h2>{data.name}</h2>
        <p>5 items available</p>
        <div className="card-wishlist-item-prevs">
          
        </div>
      </div>
    </Link>
  )
}

export default CardWishList;