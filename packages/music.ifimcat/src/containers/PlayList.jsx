import React ,{ Component } from "react"
import { connect } from "react-redux"
import PlayerList from "../components/PlayList"

class PlayList extends Component {

    render() {
        return ( <div className="center"><PlayerList /></div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(PlayList)