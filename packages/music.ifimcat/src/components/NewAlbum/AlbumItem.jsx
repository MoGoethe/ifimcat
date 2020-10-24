import React, { Component } from "react"
import { Link } from 'react-router-dom'

const AlbumItem = ({data}) =>{
    return(
        <div className="album-list-item">
            <Link to={"/list/"+data.get("id")+"/album"} className="item-link">
                <img src={data.get("picUrl")} className="item-img" />
                <img className="item-cd" src="/static/cd.svg"  />
            </Link>
            <p className="info-al">{data.get("name")}</p>
            <p className="info-ar">{data.get("artist")}</p>
        </div>
    )
}

export default AlbumItem