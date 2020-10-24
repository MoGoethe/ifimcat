/*
	播放器action
*/
export const TOGGLE_PLAY = 'TOGGLE_PLAY'  //切换播放或者暂停
export const TOGGLE_MUTE = 'TOGGLE_MUTE'	//切换静音
export const TOGGLE_SHOW_PLAYLIST = 'TOGGLE_SHOW_PLAYLIST' //显示隐藏播放列表
export const SET_PLAY_LIST = 'SET_PLAY_LIST'      //重新设置播放列表
export const ADD_TO_PLAY_LIST = 'ADD_TO_PLAY_LIST'   //添加歌曲到播放列表
export const SET_PLAYER_MUTE = 'SET_PLAYER_MUTE'   //设置静音
export const SWITCH_PLAY_MUSIC = 'SWITCH_PLAY_MUSIC'  //选择播放歌曲
export const TOGGLE_MUSIC = 'TOGGLE_MUSIC'    //切换音乐
export const TOGGLE_LOOP_MODEL = 'TOGGLE_LOOP_MODEL'    //切换音乐
export const GET_MUSIC_LYC = 'GET_MUSIC_LYC'    //获取音乐歌词
export const GET_MUSIC_SRC = 'GET_MUSIC_SRC'    //获取音乐url
export const SET_AUDIO_CRRENTTIME = 'SET_AUDIO_CRRENTTIME'    //设置currenttime

//获取各类列表数据
export const GET_RECOMMEND_MUSIC = 'GET_RECOMMEND_MUSIC'	//获取推荐音乐
//获取各类列表数据
export const GET_NEW_MUSIC = 'GET_NEW_MUSIC'	//获取推荐音乐
//设置歌单详情数据
export const GET_MUSIC_LIST_DETAIL = 'GET_MUSIC_LIST_DETAIL'	//获取各单详情
//获取排行版数据前十条
export const GET_RANK = 'GET_RANK'
//获取新碟列表
export const GET_ALBUM_LIST = 'GET_ALBUM_LIST'
//获取歌单分类列表
export const GET_PLAY_LIST = 'GET_PLAY_LIST'
//获取搜索结果
export const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT'
//设置关键字
export const SET_KEYWORDS = 'SET_KEYWORDS'
//设置搜索类型
export const SET_SEARCH_CLASSIFY = 'SET_SEARCH_CLASSIFY'
//设置loading
export const TOGGLE_LOADING = 'TOGGLE_LOADING'