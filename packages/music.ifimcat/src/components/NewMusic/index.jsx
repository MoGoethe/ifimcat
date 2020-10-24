import React ,{ Component } from "react"
import { connect } from "react-redux"

import http from "../../utils/http"
import {
    RECOMMEND_NEW_MUSIC_LIST
} from "../../utils/api"

import { 
    GET_NEW_MUSIC 
} from "../../actions"
import actionCreater from "../../actions/actionCreater"

import NewMusicItem from "./NewMusicItem"

import "./nmusic.scss"

class NewMusic extends Component{

    async getNewMusic(){
        const that = this
        const res = await http.get(RECOMMEND_NEW_MUSIC_LIST,{limit:10})
        that.props.dispatch(actionCreater(GET_NEW_MUSIC,res.data))
    }

    componentDidMount(){
        const that = this
        that.getNewMusic()
    }

    render() {
        const {state,dispatch} = this.props
        return (<div className="new-music">
            <div className="common-list-title">新歌速递</div>
            <div className="new-list">
                { 
                    state.get('newMusicList').map((item,index) => <NewMusicItem key={index} data={ item } dispatch={dispatch} />)
                }
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {state : state.initMusicListState}
}

export default connect(mapStateToProps)(NewMusic)