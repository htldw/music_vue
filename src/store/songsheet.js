import { GetSongsheetAPI, GetplaylistsAPI, GetNewSongsAPI, GetMvListAPI } from '@/api/index'
// home模块小仓库
const state = {
    //state 数据默认初始值别瞎写，服务器返回对象，服务器返回数组
    //顶部的推荐歌单
    topList: [],
    //推荐歌单列表
    list: [],
    //总条数
    total: '',
    //最新音乐
    newlists: [],
    mvlist: [],
    //mv总数
    // count: []


};
const mutations = {
    //顶部的推荐歌单
    GETSONGSHEET(state, topList) {
        state.topList = topList;
        // console.log(state.topList);

    },
    //推荐歌单列表
    GETPLAYLISTS(state, list) {
        state.list = list.playlists;
        state.total = list.total
    },
    //最新音乐
    GETNEWSONGS(state, newlists) {
        state.newlists = newlists.data;
        // console.log(state.newlists);
    },
    //mv
    GETMVLIST(state, mvlist) {
        state.mvlist = mvlist.data;
        state.mvlist.forEach(x => {
            let playCounts = x.playCount
            playCounts = playCounts.toString()
            if (playCounts.length > 4) {
                return x.playCount = playCounts.slice(0, -4) + '万'
            } else {
                return x.playCount = playCounts
            }
        })
        if (mvlist.count) {
            state.total = mvlist.count;
        } else {
            state.total = 200
        }


    },

};
const actions = {
        //顶部的推荐歌单
        async GetSongsheet({ commit }, data) {
            let res = await GetSongsheetAPI(data);
            // console.log(res);
            if (res.code == 200) {
                commit("GETSONGSHEET", res.playlists[0]);
            }
        },
        //推荐歌单列表
        async Getplaylists({ commit }, limit) {
            let res = await GetplaylistsAPI(limit);
            // console.log(res);
            if (res.code == 200) {
                commit("GETPLAYLISTS", res);
            }
        },
        //最新音乐
        async GetNewSongs({ commit }, type) {
            let res = await GetNewSongsAPI(type);
            // console.log(res);
            if (res.code == 200) {
                commit("GETNEWSONGS", res);
            }
        },
        //mv
        async GetMvList({ commit }, data) {
            let res = await GetMvListAPI(data);
            // console.log(res);
            if (res.code == 200) {
                commit("GETMVLIST", res);
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