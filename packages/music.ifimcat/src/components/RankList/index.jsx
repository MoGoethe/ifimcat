import React ,{ Component } from "react"
import { connect } from "react-redux"
import http from "../../utils/http"
import {
    RANK
} from "../../utils/api"
import { 
    GET_RANK 
} from "../../actions"
import actionCreater from "../../actions/actionCreater"
import RankListItem from "./RankListItem"
import RankListBriefnessItem from "./RankListBriefnessItem"
import "./rank.scss"

class RankList extends Component{

    async getRankMusic(){
        const that = this
        const res0 = await http.get(RANK,{limit:10,idx:0})
        that.props.dispatch(actionCreater(GET_RANK,{id:0,data:res0.data}))
        const res1 = await http.get(RANK,{limit:10,idx:1})
        that.props.dispatch(actionCreater(GET_RANK,{id:1,data:res1.data}))
        const res2 = await http.get(RANK,{limit:10,idx:2})
        that.props.dispatch(actionCreater(GET_RANK,{id:2,data:res2.data}))
    }

    componentDidMount(){
        this.getRankMusic()
    }

    render() {

        const {state,dispatch} = this.props
        return (<div className="rank">
            <div className="common-list-title">网易云音乐榜</div>
            <div className="rank-list-briefness">
                { 
                    state.get('rankListBriefness').map((item,index) => <RankListBriefnessItem dispatch={dispatch} key={index} data={ item } />)
                }
            </div>
            <div className="common-list-title">全球榜</div>
            <div className="rank-list-all">
                { 
                    state.get('rankList').map((item,index) => <RankListItem key={index} data={ item } />)
                }
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {state : state.rankState}
}

export default connect(mapStateToProps)(RankList)