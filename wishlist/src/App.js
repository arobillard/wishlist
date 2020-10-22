import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Account from './pages/Account';
import GroupsPage from './pages/GroupsPage';
import NotFound from './pages/NotFound';
import WishListsPage from './pages/WishListsPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import userData from './sampleData/users';


function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      setUser(localUser);
    }
  }, [])

  const signIn = (user) => {
    console.log(userData)
    const activeUser = userData.find(singleUser => singleUser.email === user.email);
    console.log(activeUser);
    setUser(activeUser);
    localStorage.setItem('user', JSON.stringify(activeUser));
  }

  const signOut = () => {
    console.log('logging out');
    localStorage.removeItem('user');
    setUser({});
  }

  return (
    <BrowserRouter>
      {user && user.email ? <Header user={user} /> : null }
      <main id="main" role="main">
        <Switch>
          <Route path="/" exact render={({ history }) => (
            user && user.email ? <Redirect to="/wishlists" /> : <SignIn history={history} signIn={signIn} />
          )} />
          <Route path="/sign-up" exact render={({ history }) => (
            user && user.email ? <Redirect to="/wishlists" /> : <SignUp history={history} signIn={signIn} />
          )} />
          <Route path="/wishlists" render={({ match }) => (
            user && user.email ? <WishListsPage match={match} user={user} /> : <Redirect to="/" />
          )} />
          <Route path="/groups" render={({ match }) => (
            user && user.email ? <GroupsPage match={match} user={user} /> : <Redirect to="/" />
          )} />
          <Route path="/users/:user" render={({ match }) => (
            user && user.email ? <Account match={match} user={user} signOut={signOut} /> : <Redirect to="/" />
          )} />
          <Route coomponent={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
