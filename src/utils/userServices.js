import { handleErrorMsg } from '../handlers/errorHandlers';

const BASE_URL = '/api/users/';
const SETUP_BODY = body => {
  return {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export const signIn = async (user, setFlashes, setUser) => {
  await fetch(BASE_URL + 'sign-in', SETUP_BODY(user))
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error:', response)
      }
    })
    .then(data => {
      const err = handleErrorMsg(data, setFlashes);
      if (!err) {
        setUser(data);
        setFlashes([]);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export const signUp = async (user, setFlashes, setUser) => {
  await fetch(BASE_URL + 'sign-up', SETUP_BODY(user))
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error:', response)
      }
    })
    .then(data => {
      const err = handleErrorMsg(data, setFlashes);
      if (!err) {
        setUser(data);
        setFlashes([]);
      }
    })
    .catch(err => {
      console.log(err);
    });
}