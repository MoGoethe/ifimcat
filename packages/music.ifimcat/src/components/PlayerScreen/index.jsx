import React ,{ Component } from "react"
import { connect } from "react-redux"

import "./playerScreen.scss"

class PlayerScreen extends Component{

	render(){
		const {state,searchState} = this.props
		const seconds = searchState.get("currentTime")
		const playingMusicId = state.get("playingMusicId")
		const isPlaying = state.get("isPlaying")
		let musicLrc = state.get('musicLrc') 
		const secondsFormat = seconds => {
		    let min = Math.floor(seconds / 60)
		    let sec = seconds % 60 + 100
		    return ('0' + min).slice(-2) + ':' + sec.toFixed(2).substring(1)
		}
		let currentTime = secondsFormat(seconds + 1)
		let index = 0
		const list = musicLrc.split(/[\n\r]/).map((line, i) => {
        	let match
        	match = line.match(/^\[(\d\d:\d\d\.\d\d)\]/) || line.match(/^\[(\d\d:\d\d\.\d\d\d)\]/)
	        if (match) {
	            if (match[1] < currentTime) {
	                index = i
	            }
	        }
	        return line.replace(/^\[.*?\]/, '')
	    })

		return(<div className="player-screen">
			<div className="screen-body">
				<div className="cd">
					<div className={"cd-main" + (isPlaying ? "" : " no-playing")}>
						<span className="cd-sign">Mo.Goethe</span>
						<img src={state.getIn(["playList",playingMusicId,"picUrl"])} className="cd-img" />
						<div className="cd-inner1">
							<div className="cd-inner2"></div>
						</div>
					</div>
				</div>
				<div className="lyc">
					<div className="lyc-main">
						<ul className="lyc-list" style={{ transform: `translateY(${-42 * (index - 4)}px)`}}>
							{list.map((line, i) => <li key={`${i}`} style={index === i ? { color: '#005240',fontSize:'15px' } : {}}>
					            {line}
					        </li>)}
						</ul>
					</div>			
				</div>
			</div>
		</div>)
	}
}

const mapStateToProps = state => {
    return {state:state.playerState, searchState:state.searchState}
}

export default connect(mapStateToProps)(PlayerScreen)