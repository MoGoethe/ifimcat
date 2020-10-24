import React ,{ Component } from "react"
import { connect } from "react-redux"

import "./loading.scss"

class Loading extends Component{

	render(){
		const state = this.props.state
		const loadingTexts = state.get("loadingText")
		const textIndex = ~~(Math.random() * 1000)%loadingTexts.size

		return(<div className={"loading " + (state.get("isLoading") ? "isloading" : "")}>
			<div className="transition-loader-inner">
				<span className="ball-item"></span>
				<span className="ball-item"></span>
				<span className="ball-item"></span>
				<span className="ball-item"></span>
				<span className="ball-item"></span>
				<span className="ball-item"></span>
			</div>
			<div className="loading-text">{ loadingTexts.get(textIndex) }</div>
		</div>)
	}
}

const mapStateToProps = state => {
    return {state: state.loadingState}
}

export default connect(mapStateToProps)(Loading)