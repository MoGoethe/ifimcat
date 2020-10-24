import React, { Component } from "react"
import { connect } from "react-redux"

import actionCreater from "../../actions/actionCreater"
import {
   MUSIC_LIST,
} from "../../utils/api"
import { 
    GET_PLAY_LIST 
} from "../../actions"
import { toJS } from "immutable"
import http from "../../utils/http"

import TagItem from "./TagItem"
import ListItem from "./ListItem"

import "./playlist.scss"

class PlayerList extends Component {
	async getInitPlayList(){
		const {dispatch,state} = this.props
		const res = await http.get(MUSIC_LIST,state.getIn(["tagList",0]).toJS())
        dispatch(actionCreater(GET_PLAY_LIST,res.data))
	}
	componentDidMount(){
		this.getInitPlayList()
	}
    render() {
    	const {state} = this.props
        return (<div className="play-list">
        	<div className="list-tag">
        		<span className="tag-item tag-title">热门标签：</span>
        		{
        			state.get("tagList").map((item,index)=><TagItem dispatch={this.props.dispatch} key={index} data={item} />)
        		}
        	</div>
            <div className="list">
				{
        			state.get("dataPlayList").map((item,index)=><ListItem key={index} data={item} />)
        		}
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {state : state.initMusicListState.get("playList")}
}

export default connect(mapStateToProps)(PlayerList)