import React ,{ Component } from "react"
import { connect } from "react-redux"
import http from "../../utils/http"
import {
    SEARCH
} from "../../utils/api"
import { 
    GET_SEARCH_RESULT,
    SET_KEYWORDS,
    TOGGLE_LOADING
} from "../../actions"
import actionCreater from "../../actions/actionCreater"

import SearchTypeItem from "./SearchTypeItem"
import SearchMusicItem from "./SearchMusicItem"
import SearchAlbumItem from "./SearchAlbumItem"
import SearchPlaylistItem from "./SearchPlaylistItem"
import "./search.scss"

class SearchMain extends Component{

	setKeywords(){
		this.props.dispatch(actionCreater(SET_KEYWORDS,this.refs.input.value))
	}

	async search(){
		const {state,dispatch} = this.props
		let type = state.get("classify") 
		let keywords = state.get("keywords")
		dispatch(actionCreater(TOGGLE_LOADING,true))
		let res = await http.get(SEARCH,{type:type,keywords:keywords})
		dispatch(actionCreater(TOGGLE_LOADING,false))
		if(res.data.code !== 200){
			return;
		}
		dispatch(actionCreater(GET_SEARCH_RESULT,{data:res.data,classify:type}))
	}

	enterSearch(e){
		const event = e || event
		event.keyCode === 13 ? this.search() : ''
	}

	render(){
		const { state, dispatch} = this.props
		const keywords = state.get("keywords")
		return(<div className="search">
			<div className="search-input">
				<input className="input" type="text" onKeyDown = {this.enterSearch.bind(this)} ref="input" onInput={ this.setKeywords.bind(this) } placeholder={ keywords ==='' ? "请输入关键字" : keywords} />
				<button className="button" onClick={ this.search.bind(this) }>搜索</button>
			</div>
			<div className="search-tab">
				{
					state.get("searchClassify").map((item,index)=><SearchTypeItem key={index} data={item} />)
				}
			</div>
			<div className="search-result">
				{
					state.get("classify") == 1 
					? 
					state.get("result").map((item,index)=><SearchMusicItem dispatch={dispatch} id={index} key={index} data={item} />)
					:
					(	state.get("classify") == 10 
						? 
						state.get("result").map((item,index)=><SearchAlbumItem key={index} data={item} />)
						:
						state.get("result").map((item,index)=><SearchPlaylistItem key={index} data={item} />)
					)
				}
			</div>
		</div>)
	}
}

const mapStateToProps = state => {
    return {state:state.searchState}
}
export default connect(mapStateToProps)(SearchMain)