import React ,{ Component } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { 
    TOGGLE_PLAY,
    TOGGLE_MUSIC,
    TOGGLE_LOOP_MODEL,
    TOGGLE_MUTE,
    TOGGLE_SHOW_PLAYLIST,
    GET_MUSIC_LYC,
    GET_MUSIC_SRC,
    SET_AUDIO_CRRENTTIME,
} from "../../actions"
import actionCreater from "../../actions/actionCreater"
import {
   MUSIC_URL,
   MUSIC_OTHER_URL,
   MUSIC_LYRIC,
} from "../../utils/api"
import http from "../../utils/http"

import "./player.scss"

class Player extends Component{

    async getMusicLyc(id){
        const {dispatch} = this.props
        const res = await http.get(MUSIC_LYRIC,{id:id})
        if(res.data.code !== 200){
            return;
        }
        dispatch(actionCreater(GET_MUSIC_LYC,res.data))
    }
    async getMusicSrc(id){
        const {dispatch,state} = this.props
        let res , src
        res = await http.get(MUSIC_URL,{id:id})
        if(res.data.code ===200 && res.data.data[0].url){
            src = 'http://music.163.com/song/media/outer/url?id='+id+'.mp3'
        }else{
            const playingMusicId = state.get("playingMusicId")
            const musicName = state.getIn(["playList",playingMusicId,"name"])
            const musicArtist = state.getIn(["playList",playingMusicId,"ar","name"])
            res = await http.get(MUSIC_OTHER_URL+'/'+id+'/'+musicName+'/'+musicArtist,{})
            if(res.data !== {} && res.data.song.src){
                src = res.data.song.src
            }else{
                src = 'http://music.163.com/song/media/outer/url?id='+id+'.mp3'
            }
        }
        dispatch(actionCreater(GET_MUSIC_SRC,src))
    }

    componentDidMount(){
        const state = this.props.state
        const playingMusicId = state.get("playingMusicId")
        const musicId = state.getIn(["playList",playingMusicId,"id"])
        window.__musicId = musicId
        this.getMusicLyc(musicId)
        this.getMusicSrc(musicId)
    }

    componentDidUpdate(){
        const state = this.props.state
        const playingMusicId = state.get("playingMusicId")
        const musicId = state.getIn(["playList",playingMusicId,"id"])
        if(window.__musicId === musicId){
            return
        } 
        window.__musicId = musicId
        this.getMusicLyc(musicId)
        this.getMusicSrc(musicId)
    }

    audioPause(){
        this.props.dispatch(actionCreater(TOGGLE_PLAY,false))
    }
    audioPlay(){
        this.props.dispatch(actionCreater(TOGGLE_PLAY,true))
    }
    audioTimeUpdate(){
        const that = this
        const audio = that.refs.audio
        const duration = ~~audio.duration
        const currentTime = ~~audio.currentTime
        const progressBar = that.refs.progressBar
        const totalTimeDom = that.refs.totalTime
        const curTimeDom = that.refs.curTime

        progressBar.style.width = (100 * currentTime / duration)+'%'
        curTimeDom.innerHTML = FormatTime(currentTime)
        totalTimeDom.innerHTML = FormatTime(duration)

        function FormatTime(t){
            t = Math.floor(t)
            let m = (Math.floor(t / 60) >= 10) ? t : '0'+Math.floor(t / 60)
            let s = (t%60 >=10) ? t%60 : '0'+ t%60
            return m + ':' + s 
        }
        this.props.dispatch(actionCreater(SET_AUDIO_CRRENTTIME,currentTime))
    }

    toggleMusic(musicId){
        const that = this
        if(musicId === this.props.state.get("playingMusicId")){
            setTimeout(function(){
                that.refs.audio.play()
            },500)
        }
        this.props.dispatch(actionCreater(TOGGLE_MUSIC,musicId))
    }
    togglePlay(isPlaying){
        const audio = this.refs.audio
        isPlaying ? audio.pause() :audio.play()
    }
    toggleShowPlayList(){
        this.props.dispatch(actionCreater(TOGGLE_SHOW_PLAYLIST))
    }
    toggleMute(){
        const audio = this.refs.audio
        if(audio.muted){
            audio.muted = false
        }else{
            audio.muted = true
        }
        this.props.dispatch(actionCreater(TOGGLE_MUTE))
    }
    toggleloopModel(model){
        this.props.dispatch(actionCreater(TOGGLE_LOOP_MODEL,model))
    }

    render() {

        const {state} = this.props

        const isPlaying = state.get("isPlaying")
        const playingMusicId = state.get("playingMusicId")
        const size = state.get("playList").size
        const loopModel = state.get('loopModel')
        function getMusicId(playingId,size,model,isNext){
            if(model === 1){
               return isNext ? ( (playingMusicId+1 >= size) ? 0 : playingMusicId+1)
                            : ((playingMusicId-1 < 0) ? size-1 : playingMusicId-1)
            }else if(model === 2){
                return ~~(Math.random() *1000) % size
            }else if(model === 3){
                return playingId
            }
        }
        const nextMusicId = getMusicId(playingMusicId,size,loopModel,true)
        const prevMusicId = getMusicId(playingMusicId,size,loopModel,false)

        return (<div className="player">
            <Link to="/player" className="player-cd" ></Link>
            <audio 
                preload="true" 
                autoPlay="true"
                src={ state.get("musicUrl") } 
                ref="audio" 
                onEnded = { this.toggleMusic.bind(this,nextMusicId) }
                onPause = { this.audioPause.bind(this) }
                onPlay = { this.audioPlay.bind(this) }
                onError = { this.toggleMusic.bind(this,nextMusicId) }
                onTimeUpdate = { this.audioTimeUpdate.bind(this) }
            ></audio>
            {/*<div className="audio-bg"><canvas ref="playerBg"></canvas></div>*/}
            <div className="player-i-a">
                <div className="i-photo"><img src={ state.getIn(["playList",playingMusicId,"picUrl"]) } alt="音乐图片" /></div>
                <div className="player-info">
                    <div className="i-text">
                        <span className="title">{ state.getIn(["playList",playingMusicId,"name"]) }</span>
                        <span className="actor">{ state.getIn(["playList",playingMusicId,"ar","name"]) }</span>
                    </div>
                    <div className="player-action">
                        <button onClick={this.toggleMusic.bind(this,prevMusicId)} title="上一曲" className="p-btn iconfont icon-shangyiqu101"></button>
                        <button onClick={this.togglePlay.bind(this,isPlaying)} title="播放/暂停" className={ "p-btn p-lg-btn iconfont " + (isPlaying ? "  icon-zantingstop" : " icon-bofang1")}></button>
                        <button onClick={this.toggleMusic.bind(this,nextMusicId)} title="下一曲" className="p-btn iconfont icon-shangyiqu1011"></button>
                        <button onClick={this.toggleShowPlayList.bind(this)} title="播放列表" className="p-btn iconfont icon-icon-liebiao btn-list"></button>
                        <button onClick={this.toggleMute.bind(this)} title="静音" className={"p-btn iconfont icon-remind " + (state.get("isMute") ? "is-mute" : "") }></button>
                        <button onClick={this.toggleloopModel.bind(this,loopModel)} title="切换播放模式" className={ "p-btn iconfont " + ( loopModel ===1 ? "icon-icons64x6423" : (loopModel ===2 ?  "icon-suijibofang01" :  "icon-danquxunhuan" ) ) }></button>
                    </div>
                </div>
            </div>
            <div className="player-progress">
                <div className="progress"><div className="progress-bar" ref="progressBar"></div></div>
                <div className="progress-info"><span ref="curTime" className="cur-time">00:00</span> / <span ref="totalTime" className="total-time">00:00</span></div>
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {state:state.playerState}
}

export default connect(mapStateToProps)(Player)



/*
    _setCanvasAni(){
        const that = this
        const canvas = that.refs.playerBg
        const audio = that.refs.audio
        const ctx = canvas.getContext('2d')
        const actx = new AudioContext()

        let _cw = canvas.clientWidth
        const _ch = canvas.clientHeight

        canvas.setAttribute('width',2*_cw)
        canvas.setAttribute('height',2*_ch)

        const colort = ctx.createLinearGradient(0, 0, 0, _ch * 2)
        colort.addColorStop(0, "rgba(255,0,0,.75)")
        colort.addColorStop(1, "rgba(18,196,139,.75)")

        const analyser = actx.createAnalyser()
        const audioSrc = actx.createMediaElementSource(audio)

        audioSrc.connect(analyser)
        analyser.connect(actx.destination)
        const num = 40
        const w = _cw / 40
        
        function draw() {

            let voicehigh = new Uint8Array(analyser.frequencyBinCount)
            analyser.getByteFrequencyData(voicehigh)
            let step = Math.round(voicehigh.length / num)
            ctx.clearRect(0, 0, 2 * _cw, 2 * _ch)
            ctx.beginPath()
            for (let i = 1; i < num; i++) {
                let value = voicehigh[step * i]
                ctx.fillStyle = colort
                ctx.fillRect(_cw +(i-1) * w , 2 * _ch, 0.8 * w, -value + 1 )
                ctx.fillRect(_cw - i * w , 2 * _ch, 0.8 * w, -value + 1)
                ctx.fill()
            }
            requestAnimationFrame(draw)
        }
        draw()
    }
*/