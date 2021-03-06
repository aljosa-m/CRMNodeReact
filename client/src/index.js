import 'materialize-css/dist/css/materialize.min.css';
import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import HomePage from './components/HomePage'
import ContactNew from './components/contacts/ContactNew';
import ContactList from './components/contacts/ContactList';
import ContactShow from './components/contacts/ContactShow';
import CompanyNew from './components/companies/CompanyNew';
import CompanyList from './components/companies/CompanyList';
import Authentication from './components/auth/require_auth';
import reducers from './reducers';
import {AUTH_USER} from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')

if (token) {
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="feature" component={Authentication(HomePage)} />
        <Route path="contact/new" component={Authentication(ContactNew)} />
        <Route path="contacts/:id" component={Authentication(ContactShow)}/>
        <Route path="contacts" component={Authentication(ContactList)} />
        <Route path="company/new" component={Authentication(CompanyNew)} />
        <Route path="companies" component={Authentication(CompanyList)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#root'));
