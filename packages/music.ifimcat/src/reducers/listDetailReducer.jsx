import { fromJS ,Map,toJS } from "immutable"
import { 
	GET_MUSIC_LIST_DETAIL 
} from "../actions"

const INITIAL_STATE = fromJS({
	 name:'',
	 coverImgUrl:'',
	 tags:[],
	 description:'',
	 createTime:'',
	 creator:{
	 	nickname:'',
	 	avatarUrl:'',
	 	signature:'',
	 },
	 tracks:[],
})

const listDetailState = (state = INITIAL_STATE , action ) =>{
	switch(action.type){
		case GET_MUSIC_LIST_DETAIL:
			if(action.data.classify === 'songsheet' || action.data.classify === 'rank'){
				const data = action.data.data.playlist
				const _state = {}
				_state.name = data.name
				_state.coverImgUrl = data.coverImgUrl
				_state.tags = !!data.tags.length ? data.tags : ['网易云音乐','未知类型']
				_state.description = data.description
				_state.createTime = data.createTime
				const creator = {}
				creator.nickname = data.creator.nickname
				creator.avatarUrl = data.creator.avatarUrl
				creator.signature = data.creator.signature
				_state.creator = creator
				const tracks = [];
				data.tracks.map(item =>{
					let tracksItem = {};
					tracksItem.id = item.id
					tracksItem.name = item.name
					tracksItem.alia = item.al.name
					tracksItem.dt = item.dt
					tracksItem.picUrl = item.al.picUrl
					let ar = {}
					ar.id = item.ar[0].id
					ar.name = item.ar[0].name
					tracksItem.ar = ar
					tracks.push(tracksItem)
				})
				_state.tracks = tracks
				return fromJS(_state)
			}else if(action.data.classify === 'album'){
				const data = action.data.data
				const _state = {}
				_state.name = data.album.name
				_state.coverImgUrl = data.album.picUrl
				_state.tags = [data.album.subType]
				_state.description = data.album.description
				_state.createTime = data.album.publishTime
				const creator = {}
				creator.nickname = data.album.company
				creator.avatarUrl = data.album.blurPicUrl
				creator.signature = 'data.album.creator.signature'
				_state.creator = creator
				const tracks = [];
				data.songs.map(item =>{
					let tracksItem = {};
					tracksItem.id = item.id
					tracksItem.name = item.name
					tracksItem.alia = item.al.name
					tracksItem.dt = item.dt
					tracksItem.picUrl = item.al.picUrl
					let ar = {}
					ar.id = item.ar[0].id
					ar.name = item.ar[0].name
					tracksItem.ar = ar
					tracks.push(tracksItem)
				})
				_state.tracks = tracks
				return fromJS(_state)
			}
		break
		default: return state
	}
	return state
}

export default listDetailState
/*
{
        id:523251118,
        name:"说散就散",
        alia:"电影《前任3：再见前任》主题曲",
        picUrl:"http://p1.music.126.net/e50cdn6BVUCFFHpN9RIidA==/109951163081271235.jpg",
        ar:{
            id:"10473",
            name:"袁娅维",
        }
    }

*/