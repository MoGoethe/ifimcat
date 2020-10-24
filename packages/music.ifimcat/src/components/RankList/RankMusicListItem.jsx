import React,{ Component } from "react"
import actionCreater from "../../actions/actionCreater"
import { 
    SWITCH_PLAY_MUSIC 
} from "../../actions"

class RankMusicListItem extends Component{

    switchMusic(data){
        this.props.dispatch(actionCreater(SWITCH_PLAY_MUSIC,data))
    }

    render(){
    let {data,id} = this.props
    return (
            <div className="list-item" onDoubleClick={this.switchMusic.bind(this,data)}>
                <span className={"item-num "+ (id >2 ? '' :' hot-color')}>{ ++id }</span>
                <span className="item-name">{ data.name }</span>
                <span className="item-singer">{ data.ar.name }</span>
            </div>
        )
    }	
}

export default RankMusicListItem