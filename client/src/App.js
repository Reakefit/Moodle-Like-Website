import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/AuthActions";
import Login from "./components/auth/Login";
import Home from "./Pages/Home";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
       window.__REDUX_DEVTOOLS_EXTENSION__()
));

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
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </BrowserRouter>  
      </Provider>    
    </div>
  );
}

export default App;
