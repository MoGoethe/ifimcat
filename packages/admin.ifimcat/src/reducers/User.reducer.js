import { SET_CURRENT_USER } from '../actions';

const initialState = {
  currentUser: null
};

const User = (state = initialState, { type, currentUser }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return currentUser;
    default:
      return state;
  }
}

export default User;