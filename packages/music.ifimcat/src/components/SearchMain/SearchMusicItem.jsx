import React, {Component} from "react"
import actionCreater from "../../actions/actionCreater"

import { 
    SWITCH_PLAY_MUSIC,
} from "../../actions"
import {
    MUSIC_DETAIL
} from "../../utils/api"
import http from "../../utils/http"

class SearchMusicItem extends Component{

	async switchMusic(id){
		const res = await http.get(MUSIC_DETAIL,{ids:id})
		const temp = res.data.songs[0]
		const actionData = {}
		actionData.id = temp.id
		actionData.name = temp.name
		actionData.alia = temp.alia[0]
		actionData.dt = temp.dt
		actionData.picUrl = temp.al.picUrl
		actionData.ar = temp.ar[0]
		this.props.dispatch(actionCreater(SWITCH_PLAY_MUSIC,actionData))
	}

	render(){
		let { data,id } = this.props
		return (<div className="s-music-item" onDoubleClick={this.switchMusic.bind(this,data.get("id"))} >
			<span className="item-num">{ id <10 ? '0'+ ++id : ++id }</span>
			<span className="item-name">{ data.get("name") }</span>
			<span className="item-singer">{ data.get("artist") }</span>
			<span className="item-album">{ data.get("album") }</span>
			<span className="item-time">{ data.get("time") }</span>	
		</div>)
	}
}

export default SearchMusicItem