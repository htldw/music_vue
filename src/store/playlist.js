import { GetPlaylistAPI, GetCommentAPI, GetNewCommentAPI, GetSearchAPI } from '@/api/index'
// home模块小仓库
const state = {
    //state 数据默认初始值别瞎写，服务器返回对象，服务器返回数组
    // 歌单详情
    playlist: {
        creator: {},
    },
    // 热门评论
    hotComments: [],
    // 评论总数
    hotCount: '' || 0,
    //最新评论
    comments: [],
    // 最新评论总数
    total: '' || 0,
    //搜索
    songList: [],
    // 搜索结果
    count: '' || 0,
    playlistCount: '' || 0,
    mvCount: '' || 0,

    //歌单
    playlists: [],
    //mv
    mvs: [],
    //搜索值
    // keywords: ''
};
const mutations = {
    // 歌单详情
    GETPLAYLIST(state, playlist) {
        state.playlist = playlist;
        // console.log(playlist.playCount);

        //播放量
        let playCounts = playlist.playCount
            // console.log(playCounts);
        playCounts = playCounts.toString()
        if (playCounts.length > 4) {
            return playlist.playCount = playCounts.slice(0, -4) + '万'
        } else {
            return playlist.playCount = playCounts
        }
    },
    // 热门评论
    GETCOMMENT(state, hotComments) {
        state.hotComments = hotComments.hotComments;
        state.hotCount = hotComments.total
    },
    // 最新评论
    GETNEWCOMMENT(state, comments) {
        state.comments = comments.comments;
        state.total = comments.total
            // console.log(state.total);
            // console.log(comments);

    },
    //搜索
    GETSEARCH(state, songList) {
        console.log(songList);
        state.songList = songList.songs;
        state.count = songList.songCount
        state.playlistCount = songList.playlistCount
        state.mvCount = songList.mvCount
        state.playlists = songList.playlists
        state.mvs = songList.mvs
        state.mvs.forEach(x => {
            let playCounts = x.playCount
            playCounts = playCounts.toString()
            if (playCounts.length > 4) {
                return x.playCount = playCounts.slice(0, -4) + '万'
            } else {
                return x.playCount = playCounts
            }
        })

    }
}
const actions = {
        //歌单详情
        async GetPlaylist({ commit }, id) {
            let res = await GetPlaylistAPI(id);
            // console.log(res);
            if (res.code == 200) {
                commit("GETPLAYLIST", res.playlist);
            }
        },
        //热门评论
        async GetComment({ commit }, id) {
            let res = await GetCommentAPI(id);
            // console.log(res);
            if (res.code == 200) {
                commit("GETCOMMENT", res);
            }
        },
        //最新评论
        async GetNewComment({ commit }, id) {
            let res = await GetNewCommentAPI(id);
            // console.log(res);
            if (res.code == 200) {
                commit("GETNEWCOMMENT", res);
            }
        },
        //搜索
        async GetSearch({ commit }, keywords) {
            let res = await GetSearchAPI(keywords);
            console.log(res);
            if (res.code == 200) {
                commit("GETSEARCH", res.result);
            }
        },
    }
    // 计算属性
const getters = {};
export default {
    state,
    mutations,
    actions,

}