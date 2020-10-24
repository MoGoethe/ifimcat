import React ,{ Component } from "react"
import { connect } from "react-redux"
import SearchMain from "../components/SearchMain"

class Search extends Component {

    render() {
        return ( <div className="center"><SearchMain /></div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Search)