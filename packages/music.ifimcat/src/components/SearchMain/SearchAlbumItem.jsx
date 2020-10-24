import React from "react"
import { Link } from 'react-router-dom'

const SearchAlbumItem = ({data}) =>{
	return (<div className="s-album-item" >
		<Link to={"/list/"+data.get("id")+"/album"} className="item-link">
            <img src={data.get("picUrl")} className="item-img" />
            <span className="item-name">{data.get("artist")}</span>
        </Link>
	</div>)
}

export default SearchAlbumItem