import React from "react"
import { Link } from 'react-router-dom'

const SearchPlaylistItem = ({data})=> {
	return (<div className="s-playlist-item" >
		<Link to={"/list/"+data.get("id")+"/songsheet"} className="item-link">
            <img src={data.get("picUrl")} className="item-img" />
            <span className="item-name">{data.get("name")}</span>
            <span className="item-conunt">{data.get("trackCount")} 首</span>	
            <span className="item-creater">创建者：{data.get("creater")}</span>
        </Link>
	</div>)
}

export default SearchPlaylistItem