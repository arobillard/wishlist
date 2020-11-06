import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IconLink from '@material-ui/icons/Link';
import IconDollar from '@material-ui/icons/AttachMoney';
import IconDelete from '@material-ui/icons/Delete';
import PageBanner from '../components/PageBanner';
import PopUpConfirm from '../components/PopUpConfirm';
import Spinner from '../components/loaders/Spinner';
import { getItem, deleteItem } from '../utils/itemServices';
import { userRemoveItem } from '../utils/userServices';
import { listRemoveItem } from '../utils/listServices';

const Item = ({ match, user, stateFns, setPgSettings, listId }) => {

  const [thisItem, setThisItem] = useState(null);
  const [confirm, setConfirm] = useState(false);
  
  const history = useHistory();

  useEffect(() => {
    setPgSettings({
      backBtn: {
        active: true,
        link: `/wishlists/${thisItem ? listId : ''}`,
        prev: `/items/${match.params.id}`
      },
      fab: {
        link: `/items/${match.params.id}/edit`,
        icon: 'edit'
      },
      pgClass: 'item'
    })
  }, [setPgSettings, match.params.id, listId, thisItem]);

  useEffect(() => {
    getItem(match.params.id, setThisItem);
  }, [match.params.id])
  

  const confirmDelete = () => {
    deleteItem(match.params.id, stateFns, history, listId);
    userRemoveItem(user._id, thisItem._id, stateFns);
    listRemoveItem(listId, thisItem._id, stateFns);
  }

  const handleDeleteBtn = () => {
    setConfirm(true);
  }

  const cancelPopUp = () => {
    setConfirm(false);
  }

  if (thisItem === null) {
    return <Spinner pageCenter={true} />
  } else if (thisItem === false || undefined) {
    return <h1>Sorry, item does not exist</h1>
  }
  return (
    <>
    <PageBanner
      pageTitle={thisItem.name}
      descAfter={true}
      img={thisItem.imgs ? thisItem.imgs[0] : null }
    />
    <div className="item-info push">
        <p className="item-desc">{thisItem.desc}</p>
        <a className="item-info-icon-wrap" href={thisItem.url} target="_blank" rel="noopener noreferrer">
          <IconLink className="item-info-icon" />
          <p>Find online</p>
        </a>
        <div className="item-info-icon-wrap">
          <IconDollar className="item-info-icon" />
          <p>{thisItem.price}</p>
        </div>
      </div>
      <button className="btn btn-icon" onClick={handleDeleteBtn}>
        <i className="icon i-1 push-r-1-2">
          <IconDelete />
        </i>
        <span className="icon-label">Delete Item</span>
      </button>
      <PopUpConfirm
        active={confirm}
        closeFn={cancelPopUp}
        confirmFn={confirmDelete}
        confirmText="Confirm"
        title={`Delete ${thisItem.name}?`}
        text={`Are you sure you want to delete ${thisItem.name}? This cannot be undone.`}
      />
    </>
  )
}

export default Item;