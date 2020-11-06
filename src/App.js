// Modules
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { diff } from 'deep-diff';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import User from './pages/User';
import WishLists from './pages/WishLists';
import CreateWishList from './pages/CreateWishList';
import List from './pages/List';
import CreateItem from './pages/CreateItem';
import Item from './pages/Item';
import EditItem from './pages/EditItem';

// Components
import Header from './components/Header';
import FlashList from './components/FlashList';

const preLoadLocalUser = JSON.parse(localStorage.getItem('user'));
const preLoadLocalListId = JSON.parse(localStorage.getItem('listId'));

function App() {

  const [user, setUser] = useState(preLoadLocalUser);
  const [listId, setListId] = useState(preLoadLocalListId);
  const [flashes, setFlashes] = useState([]);
  const [pgSettings, setPgSettings] = useState({
    fab: {
      icon: 'plus',
      link: '/wishlists/create'
    },
    pgClass: 'sign-in-up'
  })

  const stateFns = {
    setUser,
    setFlashes,
    setListId
  }

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (typeof diff(localUser, user) !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    };
  }, [user])

  return (
    <BrowserRouter>
      {user && <Header user={user} pgSettings={pgSettings} />}
      <main id="main" className={pgSettings.pgClass} role="main">
        {flashes.length ? <FlashList flashes={flashes} setFlashes={setFlashes} /> : null}
        <Switch>
          <Route path="/" exact render={() => (
            user ? <Redirect to="/wishlists" /> : <SignIn stateFns={stateFns} setPgSettings={setPgSettings} />
          )} />
          <Route path="/sign-up" exact render={() => (
            user ? <Redirect to="/wishlists" /> : <SignUp stateFns={stateFns} setPgSettings={setPgSettings} />
          )} />
          <Route exact path="/users/:user" render={({ match }) => (
            user ? <User match={match} stateFns={stateFns} user={user} setPgSettings={setPgSettings} /> : <Redirect to="/" />
          )} />
          <Route path="/wishlists" exact render={() => (
            user ? <WishLists user={user} stateFns={stateFns} setPgSettings={setPgSettings} /> : <Redirect to="/" />
          )} />
          <Route path="/wishlists/create" exact render={() => (
            user ? <CreateWishList user={user} stateFns={stateFns} setPgSettings={setPgSettings} /> : <Redirect to="/" />
          )} />
          <Route path="/wishlists/:list" exact render={({ match }) =>(
            user ? <List match={match} stateFns={stateFns} setPgSettings={setPgSettings} /> : <Redirect to="/" />
          )} />
          <Route path="/items/create" exact render={() => (
            user ? <CreateItem user={user} stateFns={stateFns} setPgSettings={setPgSettings} listId={listId} /> : <Redirect to="/" />
          )} />
          <Route path="/items/:id" exact render={({ match }) => (
            user ? <Item match={match} user={user} stateFns={stateFns} setPgSettings={setPgSettings} listId={listId} /> : <Redirect to="/" />
          )} />
          <Route path="/items/:id/edit" exact render={({ match }) => (
            user ? <EditItem match={match} user={user} stateFns={stateFns} setPgSettings={setPgSettings} listId={listId} /> : <Redirect to="/" />
          )} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
