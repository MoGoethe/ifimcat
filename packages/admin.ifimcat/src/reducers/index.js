import { combineReducers } from 'redux';
import sildeBar from './SlideBar.reducer';
import User from './User.reducer';

const reducers = combineReducers({
  sildeBar,
  User,
});

export default reducers;