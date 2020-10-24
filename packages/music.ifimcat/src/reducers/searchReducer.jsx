import { fromJS, Map, List } from "immutable"
import {
    GET_SEARCH_RESULT,
    SET_KEYWORDS,
    SET_AUDIO_CRRENTTIME
} from "../actions"

const INITIAL_STATE = fromJS({
	keywords:'',
	classify:1,
    currentTime:0,
	searchClassify:[{
		classifyId:1,
		name:'单曲',
	},{
		classifyId:10,
		name:'专辑',
	},{
		classifyId:1000,
		name:'歌单',
	}],
	result:[],
})

const searchState = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case GET_SEARCH_RESULT :
			const {data , classify} = action.data
			const result = []
			switch(classify){
				case 1 :
					const songs = data.result.songs
					songs.map((item,index)=>{
						const songItem = {}
						songItem.id = item.id
						songItem.name = item.name
						songItem.artist = item.artists[0].name
						songItem.album = item.album.name
						songItem.time = item.duration
						result.push(songItem)
					})
					break
				case 10 :
					const albums = data.result.albums
					albums.map((item,index)=>{
						const albumItem = {}
						albumItem.id = item.id
						albumItem.name = item.name
						albumItem.picUrl = item.blurPicUrl
						albumItem.artist = item.artists[0].name
						result.push(albumItem)
					})
					break

				case 1000 :
					const playlists = data.result.playlists
					playlists.map((item,index)=>{
						const playlistItem = {}
						playlistItem.id = item.id
						playlistItem.name = item.name
						playlistItem.picUrl = item.coverImgUrl
						playlistItem.creater = item.creator.nickname
						playlistItem.trackCount = item.trackCount
						result.push(playlistItem)
					})
					break
			}

			return state.set("result",fromJS(result)).set("classify",classify)
			break
		case SET_KEYWORDS :
			return state.set("keywords",action.data)
			break
        case SET_AUDIO_CRRENTTIME:
            return state.set("currentTime",action.data)
            break
		default: 
			return state
	}
}
export default searchState