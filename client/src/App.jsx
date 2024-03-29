import React, { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AsideMenu from './Components/Aside/AsideMenu';
import Home from './Pages/Home';
import Trends from './Components/Trends/Trends';
// import Search from './Components/Search/SearchBar';
import Images from './Components/Images/ProfileImages';
import User from './Pages/User';
import Login from './Pages/Login';
import CreatePost from './Components/CreatePost/newPost'
import BioForm  from './Components/Bio/index';
import Profile from './Pages/Profile';
import Messages from './Components/Message'
//css imports
import './main.css';
import './Components/Search/searchBar.css'
import './Components/Trends/trends.css'
import './Components/Aside/aside-menu.css'
import './Components/Images/images.css'

const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="spacer">
          <div className="aside-menu">
            <AsideMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          </div>
          <div className='center-section'>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
              <Route path="/users/:userId" element={<User />} />
              <Route path="/login" element={<Login handleLogin={handleLogin} />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/users/:userId" element={<viewUserProfile />} />
              <Route path="/editBio" element={<BioForm/> } />
            </Routes>
          </div>
          <div className="trends-section">
            <Trends />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;