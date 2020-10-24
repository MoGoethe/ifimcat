import React, {Component} from "react"
import { Link } from 'react-router-dom'

class RankListItem extends Component{

	render(){
		const { data } = this.props
		return (<div className="default-item-link">
			<Link className="item-link" to={"/list/"+data.get("idx")+"/rank"}>
				<img src={data.get("picUrl")} />
			</Link>
			<p className="item-name">{data.get("name")}</p>
		</div>)
	}
}

export default RankListItem