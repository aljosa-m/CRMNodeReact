import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, FETCH_CONTACTS, CREATE_CONTACT, FETCH_CONTACT, DELETE_CONTACT, FETCH_COMPANIES, CREATE_COMPANY, FETCH_COMPANY, DELETE_COMPANY } from './types';

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

export const fetchContacts = () => async dispatch => {
  const res = await axios.get('/api/contacts');

	dispatch({type: FETCH_CONTACTS, payload: res.data.contacts })
}

export const createContact = (values, history) => async dispatch =>  {
  const res = await axios.post('/api/contacts', values)

		browserHistory.push('/feature');
		dispatch({ type: CREATE_CONTACT, payload: res.data})
}

export const fetchContact = (id) => async dispatch => {
  const res = await axios.get(`/api/contacts/${id}`)

	dispatch({type: FETCH_CONTACT, payload: res.data.contact})
}

export const deleteContact = (id, callback) => async dispatch => {
  const res = await axios.delete(`/api/contacts/${id}/delete`)

	browserHistory.push('/contacts')
	dispatch({type: DELETE_CONTACT, payload: res.data})
}

export const fetchCompanies = () => async dispatch => {
  const res = await axios.get('/api/companies');

	dispatch({type: FETCH_COMPANIES, payload: res.data.companies })
}

export const createCompany = (values, history) => async dispatch =>  {
  const res = await axios.post('/api/companies', values)

		browserHistory.push('/feature');
		dispatch({ type: CREATE_COMPANY, payload: res.data})
}

export const fetchCompany = (id) => async dispatch => {
  const res = await axios.get(`/api/companies/${id}`)

	dispatch({type: FETCH_COMPANY, payload: res.data.company})
}

export const deleteCompany = (id, callback) => async dispatch => {
  const res = await axios.delete(`/api/companies/${id}/delete`)

	browserHistory.push('/companies')
	dispatch({type: DELETE_COMPANY, payload: res.data})
}
