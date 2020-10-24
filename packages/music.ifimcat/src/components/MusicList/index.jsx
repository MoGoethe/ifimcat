import React ,{ Component } from "react"
import { connect } from "react-redux"
import http from "../../utils/http"

import MusicListCreater from "./MusicListCreater"
import MusicListItem from "./MusicListItem"
import actionCreater from "../../actions/actionCreater"
import {
   MUSIC_LIST_DETAIL,
   RANK,
   NEW_ALBUM_DETAIL
} from "../../utils/api"
import { 
    GET_MUSIC_LIST_DETAIL 
} from "../../actions"

import "./music-list.scss"

class MusicList extends Component{

    async getMusicListDetail(id,name){
        const that = this
        let res
        switch(name){
            case 'songsheet':
                res = await http.get(MUSIC_LIST_DETAIL, { id:id })
                this.props.dispatch(actionCreater(GET_MUSIC_LIST_DETAIL,{data:res.data,classify:'songsheet'}))
                break;
            case 'rank':
                res = await http.get(RANK, { idx:id })
                this.props.dispatch(actionCreater(GET_MUSIC_LIST_DETAIL,{data:res.data,classify:'rank'}))
                break;
            case 'album':
                res = await http.get(NEW_ALBUM_DETAIL, { id:id})
                this.props.dispatch(actionCreater(GET_MUSIC_LIST_DETAIL,{data:res.data,classify:'album'}))
                break;
        }
        
    }

    componentDidMount(){
        const { musciListId, musciListName } = this.props
        this.getMusicListDetail(musciListId,musciListName)
    }

    render() {

        const {state, dispatch } =this.props

        return (<div className="center">
            <div className="music-list-detail">
                <MusicListCreater data={state} dispatch = { dispatch }  />
                <div className="music-list">
                    <div className="list-header">
                        <span className="h-item h-name">音乐标题</span>
                        <span className="h-item h-singer">歌手</span>
                        <span className="h-item h-album">专辑</span>
                        <span className="h-item h-time">时长</span>
                    </div>
                  {  state.get("tracks").map((item,index) => <MusicListItem key={ index } dispatch={dispatch} id ={ index } data={item} />) }
                  <div className="list-item" style={{textAlign:'center'}}>唔哦~ 就这么多啦~≧０≦~</div>
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {state:state.listDetailState}
}

export default connect(mapStateToProps)(MusicList)