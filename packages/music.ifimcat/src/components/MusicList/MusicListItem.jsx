import React,{ Component } from "react"
import actionCreater from "../../actions/actionCreater"
import { 
    SWITCH_PLAY_MUSIC 
} from "../../actions"

class MusicListItem extends Component{

    switchMusic(data){
        this.props.dispatch(actionCreater(SWITCH_PLAY_MUSIC,data))
    }

    render(){
    let {id,data} = this.props
    return (
            <div className="list-item" onDoubleClick={this.switchMusic.bind(this,data)}>
                <span className="item-num">{ id <10 ? '0'+ ++id : ++id }</span>
                <span className="item-name">{ data.get("name") }</span>
                <span className="item-singer">{ data.getIn(["ar","name"]) }</span>
                <span className="item-album">{ data.get("alia") }</span>
                <span className="item-time">{ data.get("dt") }</span>
            </div>
        )
    }	
}

export default MusicListItem