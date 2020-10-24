import React, {Component} from "react"
import actionCreater from "../../actions/actionCreater"
import {
   MUSIC_LIST,
} from "../../utils/api"
import { 
    GET_PLAY_LIST 
} from "../../actions"
import { toJS } from "immutable"
import http from "../../utils/http"

class RankListItem extends Component{
	async getPlayList(data){
        const res = await http.get(MUSIC_LIST,data.toJS())
        this.props.dispatch(actionCreater(GET_PLAY_LIST,res.data))
	}

	render(){
		const { data } = this.props
		return (<span className="tag-item" onClick={this.getPlayList.bind(this,data)} >{data.get("cat")}</span>)
	}
}

export default RankListItem