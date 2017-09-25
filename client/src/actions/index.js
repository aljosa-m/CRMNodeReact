import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, FETCH_CONTACTS, CREATE_CONTACT, FETCH_CONTACT, DELETE_CONTACT } from './types';

export function signinUser({ email, password }) {
	return function(dispatch) {
		axios
			.post('/api/signin', { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/feature');
			})
			.catch(() => {
				dispatch(authError('Bad Login Info'));
			});
	};
}

export function signupUser({ email, password, firstName, lastName }) {
	return function(dispatch) {
		axios
			.post('/api/signup', { email, password, firstName, lastName })
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/feature');
			})
			.catch(serve => dispatch(authError(serve.response.data.error)));
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser() {
	localStorage.removeItem('token');
	return { type: UNAUTH_USER };
}

export function fetchMessage() {
	return function(dispatch) {
		axios
			.get('/', {
				headers: { authoriaztion: localStorage.getItem('token') }
			})
			.then(response => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: response.data.message
				});
			});
	};
}

export function fetchContacts() {
  const request = axios.get('/api/contacts');

  return {
    type: FETCH_CONTACTS,
    payload: request
  }
}

export const createContact = (values, history) => async dispatch =>  {
  const res = await axios.post('/api/contacts', values)

		browserHistory.push('/feature');
		dispatch({ type: CREATE_CONTACT, payload: res.data})
}

export function fetchContact(id) {
  const request = axios.get(`/api/contacts/${id}`)

  return {
    type: FETCH_CONTACT,
    payload: request
  }
}

export function deleteContact(id, callback) {
  const request = axios.delete(`/api/contacts/${id}`)
    .then(() => callback());

  return {
    type: DELETE_CONTACT,
    payload: id
  }
}
