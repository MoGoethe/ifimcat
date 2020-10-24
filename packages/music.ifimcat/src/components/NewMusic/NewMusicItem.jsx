import React, { Component } from "react"

import actionCreater from "../../actions/actionCreater"
import { 
    SWITCH_PLAY_MUSIC 
} from "../../actions"

class NewMusicItem extends Component{

    switchMusic(data){
        this.props.dispatch(actionCreater(SWITCH_PLAY_MUSIC,data))
    }

    render(){
        const { data } = this.props
        return(
            <div className="m-list-item" onDoubleClick={this.switchMusic.bind(this,data)}>
                <div className="item-img">
                    <img src={data.picUrl} className="img" />
                </div>
                <div className="item-info">
                    <p className="info-name">{data.name} <i>{data.alia}</i></p>
                    <p className="info-singer">{data.ar.name}</p>
                </div>
            </div>
        )
    }
}

export default NewMusicItem