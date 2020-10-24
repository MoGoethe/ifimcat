import React ,{ Component } from "react"
import http from "../utils/http"

import "../components/Scss/basic.scss"
import "../components/Scss/iconfont.css"

import Player from "../components/Player"
import Header from "../components/Header"
import Banner from "../components/Banner"
import RecommendMusic from "../components/RecommendMusic"
import NewMusic from "../components/NewMusic"

class Home extends Component {
    render() {
        return (
                <div className="center">
                    {/*<Banner />*/}
                    <RecommendMusic />
                    <NewMusic />
                </div>
            )
    }
}

export default Home