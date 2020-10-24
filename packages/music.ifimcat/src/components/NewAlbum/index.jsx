import React, { Component } from "react"
import { connect } from "react-redux"
import actionCreater from "../../actions/actionCreater"
import {
   NEW_ALBUM_LIST,
} from "../../utils/api"
import { 
    GET_ALBUM_LIST 
} from "../../actions"
import http from "../../utils/http"
import AlbumItem from "./AlbumItem"

import "./album.scss"

class NewAlbum extends Component {
	async getInitAlbumList(){
		const {dispatch,state} = this.props
		const res = await http.get(NEW_ALBUM_LIST,{limit:state.get("limit"),offset:state.get("offset")})
        dispatch(actionCreater(GET_ALBUM_LIST,res.data))
	}
	componentDidMount(){
		this.getInitAlbumList()
	}
    render() {
    	const {state} = this.props
        return (<div className="album">
            <div className="common-list-title">新碟上架</div>
        	<div className="album-list">
            {
                state.get("albumList").map((item,index)=><AlbumItem key={index} data={item} />)
            }
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {state:state.initMusicListState.get("newAlbum")}
}

export default connect(mapStateToProps)(NewAlbum)