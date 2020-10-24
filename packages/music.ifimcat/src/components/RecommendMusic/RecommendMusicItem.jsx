import React from "react"
import { Link } from 'react-router-dom'

const RecommendMusicItem = ({data}) =>(
	<div className="m-list-item">
	    <Link to={"/list/"+data.id+"/songsheet"} className="item-link">
	        <img className="item-img" src={""+data.picUrl+""}  />
	        <img className="item-cd" src="/static/cd.svg"  />
	    </Link>
	    <p className="item-tag">{data.alg} <br />{data.playCount}</p>
	    <p className="item-name">{data.name}</p>
	</div>
)

export default RecommendMusicItem