import React ,{ Component } from "react"
import { connect } from "react-redux"

class Baz extends Component {

    render() {
        return ( <div> Baz page <input type="text" /> </div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Baz)