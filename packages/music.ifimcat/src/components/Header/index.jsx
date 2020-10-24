import React ,{ Component } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'

import "./header.scss"

class Header extends Component{

    back(){
        window.history.back(-1);
    }

	render() {
        return (<div className="header">
        	<Link className="menu-link-item" to="/">发现音乐</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/rank">排行榜</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/playlist">歌单</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/new">新碟上架</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/search">搜索</Link>
        	<span className="cut-line">/</span>
        </div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Header)