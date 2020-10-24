import { fromJS, Map, List } from "immutable"
import {
    TOGGLE_LOADING
} from "../actions"

const INITIAL_STATE = fromJS({
	isLoading:false,
	loadingText:[
		'你说你不会离开',
		'我一路向北，离开有你的世界',
		'原来诗跟离别，可以没有结尾',
		'梦希望没有尽头，我们走到这就好',
		'你的香味一直徘徊，我舍不得离开',
		'希望他是真的比我还要爱你',
		'走不到的路就算了，我们永远停在这里',
		'唯你最深的我意，也只你最不识抬举',
		'别的小朋友都回家了，你什么时候来接我呀！',
		'再见，不负遇见',
		'大张旗鼓的告别都是试探，真正的离开都是悄无声息',
		'一个人怕孤独，两个人怕辜负',
		'一别两宽，各生欢喜',
		'青瓦长忆旧时雨，朱伞深巷无故人',
	],
})

const loadingState = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case TOGGLE_LOADING :
			return state.set("isLoading",action.data)
			break
		default: 
			return state
	}
}
export default loadingState