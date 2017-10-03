import _ from 'lodash';
import {
	FETCH_COMPANIES,
	FETCH_COMPANY,
	DELETE_COMPANY
} from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case DELETE_COMPANY:
			return _.omit(state, action.payload);
		case FETCH_COMPANY:
			return { ...state, [action.payload._id]: action.payload };

		case FETCH_COMPANIES:
			return action.payload;
		default:
			return state;
	}
}
