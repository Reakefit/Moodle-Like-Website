import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser, loginUser } from "./actions/AuthActions";
import Login from './components/auth/Login';
import Home from "./Pages/Home";
import store from './store';
import { Provider } from 'react-redux';

if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {

    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>  
      </Provider>    
    </div>
  );
}

export default App;
