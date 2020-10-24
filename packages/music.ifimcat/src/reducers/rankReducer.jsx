import { fromJS, Map, List } from "immutable"
import {
    GET_RANK,
} from "../actions"

const INITIAL_STATE = fromJS({
    rankList:[
        {
            idx:3,
            picUrl:'/static/rankclass3.jpeg',
            name:'云音乐飙升榜',
        },
        {
            idx:4,
            picUrl:'/static/rankclass6.jpeg',
            name:'云音乐新电力榜',
        },
        {
            idx:5,
            picUrl:'/static/rankclass9.jpeg',
            name:'UK排行榜周榜',
        },
        {
            idx:6,
            picUrl:'/static/rankclass10.jpeg',
            name:'美国Billboard周榜',
        },
        {
            idx:7,
            picUrl:'/static/rankclass13.jpeg',
            name:'KTV嗨榜',
        },
        {
            idx:8,
            picUrl:'/static/rankclass14.jpeg',
            name:'iTunes榜',
        },
        {
            idx:9,
            picUrl:'/static/rankclass16.jpeg',
            name:'Hit FM Top榜',
        },
        {
            idx:10,
            picUrl:'/static/rankclass15.jpeg',
            name:'日本Oricon周榜',
        },
        {
            idx:11,
            picUrl:'/static/rankclass5.jpeg',
            name:'韩国Melon排行榜周榜',
        },
        {
            idx:12,
            picUrl:'/static/rankclass8.jpeg',
            name:'韩国Mnet排行榜周榜',
        },
        {
            idx:13,
            picUrl:'/static/rankclass25.jpeg',
            name:'韩国Melon原声周榜',
        },
        {
            idx:14,
            picUrl:'/static/rankclass18.jpeg',
            name:'中国TOP排行榜(港台榜)',
        },
        {
            idx:15,
            picUrl:'/static/rankclass19.jpeg',
            name:'中国TOP排行榜(内地榜)',
        },
        {
            idx:16,
            picUrl:'/static/rankclass20.jpeg',
            name:'香港电台中文歌曲龙虎榜',
        },
        {
            idx:17,
            picUrl:'/static/rankclass26.jpeg',
            name:'华语金曲榜',
        },
        {
            idx:18,
            picUrl:'/static/rankclass21.jpeg',
            name:'中国嘻哈榜',
        },
        {
            idx:19,
            picUrl:'/static/rankclass12.jpeg',
            name:'法国 NRJ EuroHot 30周榜',
        },
        {
            idx:20,
            picUrl:'/static/rankclass17.jpeg',
            name:'台湾Hito排行榜',
        },
        {
            idx:21,
            picUrl:'/static/rankclass11.jpeg',
            name:'Beatport全球电子舞曲榜',
        },
        {
            idx:22,
            picUrl:'/static/rankclass7.jpeg',
            name:'云音乐ACG音乐榜',
        },
        {
            idx:23,
            picUrl:'/static/rankclass23.jpeg',
            name:'云音乐嘻哈榜',
        },
    ],
    rankListBriefness:[
        {
            idx:0,
            picUrl:'/static/rankclass0.jpeg',
            name:'云音乐新歌榜',
            rankdata:[],
        },
        {
            idx:1,
            picUrl:'/static/rankclass1.jpeg',
            name:'云音乐热歌榜',
            rankdata:[],
        },
        {
            idx:2,
            picUrl:'/static/rankclass2.jpeg',
            name:'网易原创歌曲榜',
            rankdata:[],
        },
    ]
})


const rankState = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RANK:
            const {id,data} = action.data
            const newMusicList = []
            let item
            for(let i=0; i<10;i++){
                item = data.playlist.tracks[i]
                let nItem = {}
                nItem.id = item.id
                nItem.name = item.name
                nItem.alia = item.ar[0].alias[0]
                nItem.picUrl = item.al.picUrl
                let ar = {}
                ar.id = item.ar[0].id
                ar.name = item.ar[0].name
                nItem.ar = ar
                newMusicList.push(nItem)
            }
            return state.setIn(['rankListBriefness',id,"rankdata"],List(newMusicList))
            break
        default:
            return state
    }
}

export default rankState