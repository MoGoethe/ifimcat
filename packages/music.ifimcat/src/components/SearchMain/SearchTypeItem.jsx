import React, {Component} from "react"
import { connect } from "react-redux"
import actionCreater from "../../actions/actionCreater"
import {
   SEARCH,
} from "../../utils/api"
import { 
    GET_SEARCH_RESULT,
    SET_SEARCH_CLASSIFY,
    TOGGLE_LOADING
} from "../../actions"

import http from "../../utils/http"

class searchTypeItem extends Component{
	async toSearch(type,keywords){
		const dispatch = this.props.dispatch
		dispatch(actionCreater(TOGGLE_LOADING,true))
        const res = await http.get(SEARCH,{type:type,keywords:keywords})
		dispatch(actionCreater(TOGGLE_LOADING,false))
        if(res.data.code !== 200){
			return;
		}
        dispatch(actionCreater(GET_SEARCH_RESULT,{data:res.data,classify:type}))
	}

	render(){
		const { data,state } = this.props
		const keywords = state.get("keywords")
		const classify = state.get("classify")
		return (<span className={"type-item " + (classify=== data.get("classifyId") ? "active" : '')} onClick={this.toSearch.bind(this,data.get("classifyId"),keywords)} >{data.get("name")}</span>)
	}
}

const mapStateToProps = state => {
    return {state:state.searchState}
}
export default connect(mapStateToProps)(searchTypeItem)