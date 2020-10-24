import React, { Component } from "react"
import { Link } from 'react-router-dom'

const ListItem = ({data}) =>{
    return(
        <div className="m-list-item">
            <Link to={"/list/"+data.get("id")+"/songsheet"} className="item-img">
                <img src={data.get("picUrl")} className="item-img" />
                <p className="item-info"><i className="iconfont icon-yonghu"></i>{data.get("nickname")}</p>
            </Link>
            <p className="info-name">{data.get("name")}</p>
        </div>
    )
}

export default ListItem