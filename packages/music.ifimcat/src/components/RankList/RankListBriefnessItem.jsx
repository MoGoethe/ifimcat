import React, {Component} from "react"
import { Link } from 'react-router-dom'
import RankMusicListItem from "./RankMusicListItem"

class RankListBriefnessItem extends Component{
 	render(){
 		const {data,dispatch} = this.props
		return (<div className="briefness-item">
			<Link className="item-link" to={"/list/"+data.get("idx")+"/rank"}>
				<img src={data.get("picUrl")} />
			</Link>
			<div className="item-list">
				{data.get("rankdata").map((item,index)=><RankMusicListItem dispatch={dispatch} data={item} key={index} id={index} />)}
			</div>
		</div>)
	}
}

export default RankListBriefnessItem