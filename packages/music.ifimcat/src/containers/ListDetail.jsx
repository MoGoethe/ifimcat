import React, { Component } from "react"
import { connect } from "react-redux"

import MusicList from "../components/MusicList"

class ListDetail extends Component {

    render() {
        const musciListId = this.props.match.params.id
        const musciListName = this.props.match.params.name
        return ( <MusicList musciListId={ musciListId } musciListName={ musciListName } /> )
    }
}

export default ListDetail