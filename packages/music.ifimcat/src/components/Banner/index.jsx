import React ,{ Component } from "react"
import { connect } from "react-redux"

import "./banner.scss"

class Banner extends Component{

    render() {
        return (<div className="banner">
            <div className="banner-item active"><a className="banner-link"><img className="banner-img" src="/static/banner.png" /></a></div>
            <div className="banner-item "><a className="banner-link"><img className="banner-img" src="/static/banner.png" /></a></div>
            <div className="banner-item"><a className="banner-link"><img className="banner-img" src="/static/banner.png" /></a></div>
            <div className="banner-item"><a className="banner-link"><img className="banner-img" src="/static/banner.png" /></a></div>
            <div className="banner-item"><a className="banner-link"><img className="banner-img" src="/static/banner.png" /></a></div>
            <div className="banner-item"><a className="banner-link"><img className="banner-img" src="/static/banner.png" /></a></div>
            <div className="banner-item"><a className="banner-link"><img className="banner-img" src="/static/banner.png" /></a></div>
            <div className="banner-item"><a className="banner-link"><img className="banner-img" src="/static/banner.png" /></a></div>
        </div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Banner)