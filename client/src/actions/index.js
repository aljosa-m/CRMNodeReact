import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

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
