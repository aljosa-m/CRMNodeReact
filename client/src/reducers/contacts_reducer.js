import _ from 'lodash';
import { FETCH_CONTACTS, FETCH_CONTACT, DELETE_CONTACT } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_CONTACT:
      return _.omit(state, action.payload);
    case FETCH_CONTACT:
      // const post = action.payload.data;
      // const newState = { ...state,  };
      // newState[post.id] = post
      // return newState;

      return {...state, [action.payload.data.id]: action.payload.data};

    case FETCH_CONTACTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
