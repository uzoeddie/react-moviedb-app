import { SET_LOADER } from '../types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return action.payload;
    default:
      return state;
  }
};
