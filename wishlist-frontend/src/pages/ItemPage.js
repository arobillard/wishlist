import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import IconLink from '@material-ui/icons/Link';
import IconDollar from '@material-ui/icons/AttachMoney';
import IconDelete from '@material-ui/icons/Delete';
import { formatPrice } from '../helpers';
import PopUpConfirm from '../components/PopUpConfirm';

const ItemPage = ({ user, match, setPage, setErrors, setUser, history }) => {

  const [item, setItem] = useState({});
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const thisItem = user.items.find(aItem => aItem._id === match.params.item);
    setItem(thisItem);

    setPage({
      backBtn: true,
      fab: {
        icon: 'edit',
        link: `/users/${match.params.user}/items/${match.params.item}/edit`
      }
    })

  }, [item.imgs, match.params.item, match.params.user, setPage, user.items])

  const handleDelete = () => {
    setConfirm(true);
  }

  const cancelPopUp = () => {
    setConfirm(false);
  }

  const deleteItem = async () => {
    console.log('item deleting');
    const itemToDelete = {
      userId: user._id,
      itemId: item._id
    }
    await fetch('/items/delete', {
      method: "post",
      body: JSON.stringify(itemToDelete),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        setErrors(['Error: unable to delete item.'])
      }
    })
    .then(data => {
      setUser(data);
      history.push(`/wishlists/${item.listRef[0]}`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <PageBanner
        pageTitle={item.name}
        descAfter={true}
        img={item.imgs ? item.imgs[0] : null }
      />
      <div className="item-info push">
        <p className="item-desc">{item.desc}</p>
        <a className="item-info-icon-wrap" href={item.url} target="_blank" rel="noopener noreferrer">
          <IconLink className="item-info-icon" />
          <p>Find online</p>
        </a>
        <div className="item-info-icon-wrap">
          <IconDollar className="item-info-icon" />
          <p>{formatPrice(item.price)}</p>
        </div>
      </div>
      <button className="btn btn-icon" onClick={handleDelete}>
        <i className="icon i-1 push-r-1-2">
          <IconDelete />
        </i>
        <span className="icon-label">Delete Item</span>
      </button>
      <PopUpConfirm
        active={confirm}
        closeFn={cancelPopUp}
        confirmFn={deleteItem}
        confirmText="Confirm"
        title={`Delete ${item.name}?`}
        text={`Are you sure you want to delete ${item.name}? This cannot be undone.`}
      />
    </>
  )
}

export default ItemPage;