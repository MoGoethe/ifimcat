import { combineReducers } from 'redux'
import searchState from './searchReducer'
import playerState from './playerReducer'
import initMusicListState from './initMusicListReducer'
import listDetailState from './listDetailReducer'
import rankState from './rankReducer'
import loadingState from './loadingReducer'

const reducer = combineReducers({
    searchState,
    playerState,
    initMusicListState,
    listDetailState,
    rankState,
    searchState,
    loadingState
});

export default reducer