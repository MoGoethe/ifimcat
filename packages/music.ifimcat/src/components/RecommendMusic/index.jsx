import React ,{ Component } from "react"
import { connect } from "react-redux"
import http from "../../utils/http"
import {
    RECOMMEND_HOT_MUSIC_LIST
} from "../../utils/api"
import { 
    GET_RECOMMEND_MUSIC,
    TOGGLE_LOADING
} from "../../actions"
import actionCreater from "../../actions/actionCreater"
import RecommendMusicItem from "./RecommendMusicItem"
import "./rmusic.scss"

class RecommendMusic extends Component{

    async getRecommendMusic(){
        const that = this
        that.props.dispatch(actionCreater(TOGGLE_LOADING,true))
        const res = await http.get(RECOMMEND_HOT_MUSIC_LIST,{limit:10})
        that.props.dispatch(actionCreater(GET_RECOMMEND_MUSIC,res.data))
        that.props.dispatch(actionCreater(TOGGLE_LOADING,false))
    }

    componentDidMount(){
        this.getRecommendMusic()
    }

    render() {

        const {state} = this.props
        return (<div className="recommend-music">
            <div className="common-list-title">推荐歌单</div>
            <div className="rm-list">
                { 
                    state.get('recommendMusicList').map((item,index) => <RecommendMusicItem key={index} data={ item } />)
                }
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {state : state.initMusicListState}
}

export default connect(mapStateToProps)(RecommendMusic)