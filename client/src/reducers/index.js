import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import contactReducer from './contacts_reducer'

export default combineReducers({
	form: form,
  auth: authReducer,
	contacts: contactReducer
});
