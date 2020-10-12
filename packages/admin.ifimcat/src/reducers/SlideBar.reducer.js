import { TOGGLE_SLIDEBAR } from '../actions';

const initialState = {
  sidebarShow: 'responsive'
}

const sidebar = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case TOGGLE_SLIDEBAR:
      return {...state, ...rest }
    default:
      return state
  }
}

export default sidebar