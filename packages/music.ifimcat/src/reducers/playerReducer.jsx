import { GET_ARTICLE_LIST } from "../actions"
import { fromJS, List } from "immutable"
import {
    TOGGLE_PLAY,
    TOGGLE_MUSIC,
    SET_PLAY_LIST,
    ADD_TO_PLAY_LIST,
    SWITCH_PLAY_MUSIC,
    TOGGLE_MUTE,
    TOGGLE_SHOW_PLAYLIST,
    TOGGLE_LOOP_MODEL,
    GET_MUSIC_LYC,
    GET_MUSIC_SRC,
    SET_AUDIO_CRRENTTIME,
} from "../actions"

const INITIAL_STATE = fromJS({
    isPlaying: false,
    isMute: false,
    musicUrl:'',
    musicLrc:'',
    playList: [{
        id: 185697,
        name: "花海",
        alia: "",
        picUrl: "http://p1.music.126.net/uKR6EQ1dLq4i1UBhXmvXtQ==/721279627833133.jpg",
        ar: {
            id: "6452",
            name: "周杰伦",
        }
    }],
    isShowPlayList: false,
    playingMusicId: 0,
    loopModel: 1,
})

const playerState = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_PLAY:
            return state.set('isPlaying', action.data)
            break
        case TOGGLE_MUSIC:
            return state.set('playingMusicId', action.data)
            break
        case SET_PLAY_LIST:
            return state.set('playList', action.data).set("playingMusicId",0)
            break;
        case ADD_TO_PLAY_LIST:
            state.get('playList').map((item) => {
                let index = action.data.findIndex(r => r.get("id") === item.get("id"))
                if (index !== -1) {
                    action.data = action.data.splice(index, 1)
                }
            })
            return state.set('playList', state.get("playList").concat(action.data))
            break;
        case SWITCH_PLAY_MUSIC:
            action.data = action.data.get ? action.data : fromJS(action.data)
            let index = state.get('playList').findIndex(r => r.get("id") === action.data.get("id"))
            if(index === -1){
                return state.set('playList',state.get("playList").concat(List([action.data]))).set('playingMusicId',state.get("playList").size)
            }else{
                return state.set('playingMusicId',index)
            }
            break;
        case TOGGLE_MUTE:
            return state.set("isMute", !state.get("isMute"))
            break;
        case TOGGLE_SHOW_PLAYLIST:
            return state.set("isShowPlayList", !state.get("isShowPlayList"))
            break;
        case TOGGLE_LOOP_MODEL:
            let loopModel = action.data+1 > 3 ? 1 : action.data+1
            return state.set("loopModel",loopModel)
            break;
        case GET_MUSIC_LYC:
            let lrc = action.data.lrc.lyric || ''
            return state.set("musicLrc",lrc)
            break;
        case GET_MUSIC_SRC:
            return state.set("musicUrl",action.data)
            break;
        default:
            return state
    }
}

export default playerState