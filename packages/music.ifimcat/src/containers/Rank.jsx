import React ,{ Component } from "react"
import { connect } from "react-redux"
import RankList from "../components/RankList"

class Rank extends Component {

    render() {
        return ( <div className="center">
        	<RankList />
        </div>)
    }
}

export default Rank