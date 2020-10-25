import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { diff } from 'deep-diff';
import Header from './components/Header';
import ErrorList from './components/ErrorList';
import UserPage from './pages/UserPage';
import ItemPage from './pages/ItemPage';
import GroupsPage from './pages/GroupsPage';
import NotFound from './pages/NotFound';
import WishListsPage from './pages/WishListsPage';
import ListPage from './pages/ListPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const preLoadLocalUser = JSON.parse(localStorage.getItem('user'));

function App() {

  const [user, setUser] = useState(preLoadLocalUser);
  const [errors, setErrors] = useState([]);
  const [page, setPage] = useState({})

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (typeof diff(localUser, user) !== 'undefined') {
      console.log('there are differences!')
      localStorage.setItem('user', JSON.stringify(user));
    };
  }, [user])

  const signIn = async (user) => {
    const response = await fetch('/users/sign-in', {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const activeUser = await response.json();
    if (activeUser.err) {
      const updatedErrors = [...errors, activeUser.err];
      setErrors(updatedErrors)
    } else {
      setUser(activeUser);
      localStorage.setItem('user', JSON.stringify(activeUser));
      setErrors([]);
    }
  }

  const signOut = () => {
    console.log('logging out');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <BrowserRouter>
      {user && user.email ? <Header user={user} page={page} /> : null }
      <main id="main" role="main">
        {errors.length ? <ErrorList errs={errors} setErrors={setErrors} /> : null}
        <Switch>
          <Route path="/" exact render={({ history }) => (
            user ? <Redirect to="/wishlists" /> : <SignIn history={history} signIn={signIn} />
          )} />
          <Route path="/sign-up" exact render={({ history }) => (
            user ? <Redirect to="/wishlists" /> : <SignUp history={history} setUser={setUser} errors={errors} setErrors={setErrors} />
          )} />
          <Route path="/wishlists" exact render={({ match }) => (
            user ? <WishListsPage setPage={setPage} match={match} user={user} /> : <Redirect to="/" />
          )} />
          <Route path="/wishlists/:list" render={({ match }) => (
            user ? <ListPage setPage={setPage} match={match} user={user} /> : <Redirect to="/" />
          )} />
          <Route path="/groups" render={({ match }) => (
            user ? <GroupsPage setPage={setPage} match={match} user={user} /> : <Redirect to="/" />
          )} />
          <Route exact path="/users/:user" render={({ match }) => (
            user ? <UserPage setPage={setPage} match={match} user={user} signOut={signOut} /> : <Redirect to="/" />
          )} />
          <Route path="/users/:user/items/:item" render={({ match }) => (
            user ? <ItemPage setPage={setPage} match={match} user={user} signOut={signOut} /> : <Redirect to="/" />
          )} />
          <Route coomponent={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
