import { handleErrorMsg } from '../handlers/errorHandlers';

const BASE_URL = '/api/lists/';
const POST_BODY = body => {
  return {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export const getListCollection = async (ids, setLists) => {
  await fetch(BASE_URL + 'collection', POST_BODY(ids))
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('throwin error');
        throw new Error('Error:', response)
      }
    })
    .then(data => {
      setLists(data);
    })
    .catch(err => {
      console.log('catching');
      console.log(err);
    })
}

export const createList = async (list, stateFns, history) => {
  const createdList = await fetch(BASE_URL + 'create', POST_BODY(list))
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error:', response)
      }
    })
    .then(data => {
      const err = handleErrorMsg(data, stateFns.setFlashes);
      if (!err) {
        stateFns.setFlashes([{
          msg: 'List created!',
          type: 'success'
        }]);
        history.push(`/wishlists/${data._id}`);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
    });
  return createdList;
}

export const getList = async (listId, setThisList) => {
  await fetch(BASE_URL + listId)
    .then(async response => {
      if (response.ok) {
        return response.json();
      } else {
        return false;
      }
    })
    .then(data => {
      setThisList(data);
    })
    .catch(err => {
      console.log("Error: Could not find list.");
    });
}

export const listAddItem = async (listId, itemId, stateFns) => {
  await fetch(BASE_URL + listId + '/add-item/' + itemId, { method: 'post' })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error({ newErr: 'Unable to add Item to List' })
      }
    })
    .catch(err => {
      stateFns.setFlashes([{
        msg: 'Unable to add item to list.',
        type: 'error'
      }]);
    })
}

export const listRemoveItem = async (listId, itemId, stateFns) => {
  await fetch(BASE_URL + listId + '/remove-item/' + itemId, { method: 'post' })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error({ newErr: 'Unable to remove Item from list' })
      }
    })
    .catch(err => {
      stateFns.setFlashes([{
        msg: 'Unable to remove item to list.',
        type: 'error'
      }]);
    })
}