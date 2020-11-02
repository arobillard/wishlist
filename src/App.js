// Modules
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { diff } from 'deep-diff';

// Helpers
import { handleErrorMsg } from './handlers/errorHandlers';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import WishLists from './pages/WishLists';
import User from './pages/User';

// Components
import Header from './components/Header';
import FlashList from './components/FlashList';

const preLoadLocalUser = JSON.parse(localStorage.getItem('user'));

function App() {

  const [user, setUser] = useState(preLoadLocalUser);
  const [flashes, setFlashes] = useState([]);

  const stateFns = {
    setUser,
    setFlashes
  }

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (typeof diff(localUser, user) !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    };
  }, [user])

  // const signIn = async (user) => {
  //   await fetch('/api/users/sign-in', {
  //     method: 'post',
  //     body: JSON.stringify(user),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error('Error:', response)
  //     }
  //   })
  //   .then(data => {
  //     const err = handleErrorMsg(data, setFlashes);
  //     if (!err) {
  //       setUser(data);
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  return (
    <BrowserRouter>
      {user && <Header user={user} />}
      <main id="main" role="main">
        {flashes.length ? <FlashList flashes={flashes} setFlashes={setFlashes} /> : null}
        <Switch>
          <Route path="/" exact render={() => (
            user ? <Redirect to="/wishlists" /> : <SignIn stateFns={stateFns} />
          )} />
          <Route path="/sign-up" exact render={() => (
            user ? <Redirect to="/wishlists" /> : <SignUp stateFns={stateFns} />
          )} />
          <Route path="/wishlists" exact render={() => (
            user ? <WishLists /> : <Redirect to="/" />
          )} />
          <Route exact path="/users/:user" render={({ match }) => (
            user ? <User match={match} stateFns={stateFns} /> : <Redirect to="/" />
          )} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
