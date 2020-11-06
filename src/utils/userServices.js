import { handleErrorMsg } from '../handlers/errorHandlers';

const BASE_URL = '/api/users/';
const POST_BODY = body => {
  return {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export const signInUp = async (action, user, stateFns) => {
  await fetch(BASE_URL + action, POST_BODY(user))
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
        stateFns.setUser(data);
        stateFns.setFlashes([]);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export const getUser = async (userId, setThisUser) => {
  await fetch(BASE_URL + userId)
    .then(async response => {
      if (response.ok) {
        return response.json();
      } else {
        return false;
      }
    })
    .then(data => {
      setThisUser(data);
    })
    .catch(err => {
      console.log("Error: Could not find user.");
    });
}

export const userAddList = async (userId, listId, stateFns) => {
  await fetch(BASE_URL + userId + '/add-list/' + listId, { method: 'post' })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error({ newErr: 'Unable to add List to User' })
      }
    })
    .catch(err => {
      stateFns.setFlashes([{
        msg: 'Unable to add list to user.',
        type: 'error'
      }]);
    })
}

export const userAddItem = async (userId, itemId, stateFns) => {
  await fetch(BASE_URL + userId + '/add-item/' + itemId, { method: 'post' })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error({ newErr: 'Unable to add Item to User' })
      }
    })
    .catch(err => {
      stateFns.setFlashes([{
        msg: 'Unable to add item to user.',
        type: 'error'
      }]);
    })
}

export const userRemoveItem = async (userId, itemId, stateFns) => {
  await fetch(BASE_URL + userId + '/remove-item/' + itemId, { method: 'post' })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error({ newErr: 'Unable to remove Item from User' })
      }
    })
    .catch(err => {
      stateFns.setFlashes([{
        msg: 'Unable to remove item to user.',
        type: 'error'
      }]);
    })
}