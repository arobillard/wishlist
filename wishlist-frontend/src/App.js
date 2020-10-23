import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import ErrorList from './components/ErrorList';
import Account from './pages/Account';
import GroupsPage from './pages/GroupsPage';
import NotFound from './pages/NotFound';
import WishListsPage from './pages/WishListsPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {

  const [user, setUser] = useState(null);
  // const [errors, setErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      setUser(localUser);
    }
  }, [])

  const signIn = async (user) => {
    const response = await fetch('/users/sign-in', {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const activeUser = await response.json();
    // console.log(userData)
    // const activeUser = userData.find(singleUser => singleUser.email === user.email);
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
      {user && user.email ? <Header user={user} /> : null }
      <main id="main" role="main">
        {errors.length ? <ErrorList errs={errors} setErrors={setErrors} /> : null}
        <Switch>
          <Route path="/" exact render={({ history }) => (
            user ? <Redirect to="/wishlists" /> : <SignIn history={history} signIn={signIn} />
          )} />
          <Route path="/sign-up" exact render={({ history }) => (
            user ? <Redirect to="/wishlists" /> : <SignUp history={history} setUser={setUser} errors={errors} setErrors={setErrors} />
          )} />
          <Route path="/wishlists" render={({ match }) => (
            user ? <WishListsPage match={match} user={user} /> : <Redirect to="/" />
          )} />
          <Route path="/groups" render={({ match }) => (
            user ? <GroupsPage match={match} user={user} /> : <Redirect to="/" />
          )} />
          <Route path="/users/:user" render={({ match }) => (
            user ? <Account match={match} user={user} signOut={signOut} /> : <Redirect to="/" />
          )} />
          <Route coomponent={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
