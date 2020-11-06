import { handleErrorMsg } from '../handlers/errorHandlers';

const BASE_URL = '/api/items/';
const POST_BODY = body => {
  return {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export const createItem = async (item, stateFns, history, listId) => {
  const createdItem = await fetch(BASE_URL + 'create', POST_BODY(item))
    .then(async response => {
      if (response.ok) {
        return response.json();
      } else {
        const res = await response.json();
        console.log(res)
        throw new Error('Error:', response)
      }
    })
    .then(data => {
      const err = handleErrorMsg(data, stateFns.setFlashes);
      if (!err) {
        stateFns.setFlashes([{
          msg: 'Item created!',
          type: 'success'
        }]);
        history.push({
          pathname: `/items/${data._id}`,
          state: { list: listId }
        });
        return data;
      }
    })
    .catch(err => {
      console.log(err);
    });
  return createdItem;
}
export const editItem = async (itemId, item, stateFns, history, listId) => {
  const createdItem = await fetch(BASE_URL + itemId + '/edit', POST_BODY(item))
    .then(async response => {
      if (response.ok) {
        return response.json();
      } else {
        const res = await response.json();
        console.log(res)
        throw new Error('Error:', response)
      }
    })
    .then(data => {
      const err = handleErrorMsg(data, stateFns.setFlashes);
      if (!err) {
        stateFns.setFlashes([{
          msg: 'Item updated!',
          type: 'success'
        }]);
        history.push({
          pathname: `/items/${data._id}`,
          state: { list: listId }
        });
        return data;
      }
    })
    .catch(err => {
      console.log(err);
    });
  return createdItem;
}

export const getItem = async (itemId, setThisItem) => {
  await fetch(BASE_URL + itemId)
    .then(async response => {
      if (response.ok) {
        console.log('res ok')
        return response.json();
      } else {
        console.log('res not ok')
        return false;
      }
    })
    .then(data => {
      console.log('data return')
      setThisItem(data);
    })
    .catch(err => {
      console.log("Error: Could not find item.");
    });
}

export const deleteItem = async (itemId, stateFns, history, listId) => {
  await fetch(BASE_URL + itemId + '/delete', { method: 'post' })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        stateFns.setFlashes([{
          msg: 'Unable to delete item.',
          type: 'error'
        }])
      }
    })
    .then(data => {
      const err = handleErrorMsg(data, stateFns.setFlashes);
      if (!err) {
        history.push(`/wishlists/${listId}`);
        stateFns.setFlashes([{
          msg: 'Item deleted.',
          type: 'success'
        }])
      }
    })
    .catch(err => {
      console.log("Error: Unable to delete item.")
    })
}

export const getItemCollection = async (ids, setItems) => {
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
      setItems(data);
    })
    .catch(err => {
      console.log('catching');
      console.log(err);
    })
}