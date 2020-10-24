import React,{ Component } from "react"
import { connect } from "react-redux"

import { 
    ADD_TO_PLAY_LIST,
    SET_PLAY_LIST, 
} from "../../actions"
import actionCreater from "../../actions/actionCreater"

class MusicListCreater extends Component{

    playList(data){
        this.props.dispatch(actionCreater(SET_PLAY_LIST,data))
    }
    addToList(data){
        this.props.dispatch(actionCreater(ADD_TO_PLAY_LIST,data))
    }

    render() {
        const data = this.props.data
        return (
            <div className="creater">
                <div className="c-photo">
                    <img src={ data.get("coverImgUrl") } alt="" />
                </div>
                <div className="c-info">
                    <p className="i-name">{ data.get("name") }</p>
                    <p className="i-user">
                        <img src={ data.getIn(["creator","avatarUrl"]) } alt="" className="i-u-photo" />
                        <span className="i-u-name">{data.getIn(["creator","nickname"])}</span>
                        <span className="i-u-create-time">{data.get("createTime")}创建</span>
                    </p>
                    <p className="i-tags">
                        {data.get("tags").map((item,index) =>  <span key={index} className="i-tag-item">{item}</span>)}
                    </p>
                    <p className="c-action">
                        <button onClick={ this.playList.bind(this,data.get('tracks')) } className="c-btn play-list"><i className="iconfont  icon-bofang" ></i>全部播放</button>
                        <button onClick={ this.addToList.bind(this,data.get('tracks')) } className="c-btn"><i className="iconfont icon-ttpodicon" ></i>添加到列表</button>
                    </p>
                </div>
            </div>
        )
    }
}


export default MusicListCreater