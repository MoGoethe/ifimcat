import { fromJS, Map, List } from "immutable"
import {
    GET_RECOMMEND_MUSIC,
    GET_NEW_MUSIC,
    GET_PLAY_LIST,
    GET_ALBUM_LIST
} from "../actions"

const INITIAL_STATE = fromJS({
    recommendMusicList: [],
    newMusicList: [],
    newAlbum:{
        albumList:[],
        limit:30,
        offset:0,
    },
    playList:{
        tagList:[{
            limit:15,
            order:'hot',
            cat:'华语',
        },{
            limit:15,
            order:'hot',
            cat:'流行',
        },{
            limit:15,
            order:'hot',
            cat:'摇滚',
        },{
            limit:15,
            order:'hot',
            cat:'民谣',
        },{
            limit:15,
            order:'hot',
            cat:'电子',
        },{
            limit:15,
            order:'hot',
            cat:'轻音乐',
        },{
            limit:15,
            order:'hot',
            cat:'ACG',
        },{
            limit:15,
            order:'hot',
            cat:'怀旧',
        },{
            limit:15,
            order:'hot',
            cat:'治愈',
        }],
        dataPlayList:[],
    }
})

const initMusicListState = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RECOMMEND_MUSIC:
            return state.set('recommendMusicList', List(action.data.result))
            break
        case GET_NEW_MUSIC:
            const newMusicList = []
            action.data.result.map(item=>{
                let nItem = {}
                nItem.id = item.id
                nItem.name = item.name
                nItem.alia = item.song.alias[0]
                nItem.picUrl = item.song.album.picUrl+'?param=200y200'
                let ar = {}
                ar.id = item.song.artists[0].id
                ar.name = item.song.artists[0].name
                nItem.ar = ar
                newMusicList.push(nItem)
            })
            return state.set('newMusicList',List(newMusicList))
            break
        case GET_PLAY_LIST:
            const playList = []
            action.data.playlists.map(item=>{
                let pItem = {}
                pItem.name = item.name
                pItem.id = item.id
                pItem.nickname = item.creator.nickname
                pItem.picUrl = item.coverImgUrl+'?param=200y200'
                playList.push(pItem)
            })
            return state.setIn(["playList","dataPlayList"],fromJS(playList))
            break
        case GET_ALBUM_LIST:
            const albumList=[]
            action.data.albums.map(item=>{
                let albumItem = {}
                albumItem.id = item.id
                albumItem.name = item.name
                albumItem.picUrl = item.picUrl+'?param=200y200'
                albumItem.artist = item.artists[0].name
                albumList.push(albumItem)
            })
            return state.setIn(['newAlbum','albumList'],fromJS(albumList))
            break
        default:
            return state
    }
}

export default initMusicListState