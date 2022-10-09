import { GetBannerListAPI, GetPersonalizedAPI, GetNewsongAPI, GetMvAPI, GetSongAPI } from '@/api/index'
// home模块小仓库
const state = {
    //state 数据默认初始值别瞎写，服务器返回对象，服务器返回数组
    //轮播图数据
    banners: [],
    //推荐歌单
    list: [],
    // 最新音乐
    songs: [],
    //推荐MV
    mvs: [],
    // 点击的音乐url
    url: '',

};
const mutations = {
    //轮播图
    GETBANNERSLIST(state, banners) {
        state.banners = banners;
        // console.log(banners);
    },
    //推荐歌单
    GETPERSONALIZED(state, list) {
        state.list = list;
        // console.log(list);
    },
    // 最新音乐
    GETNEWSONG(state, songs) {
        state.songs = songs;
        // console.log(songs);
    },
    // 推荐MV
    GETMV(state, mvs) {
        state.mvs = mvs;
        state.mvs.forEach(x => {
            let playCounts = x.playCount
            playCounts = playCounts.toString()
            if (playCounts.length > 4) {
                return x.playCount = playCounts.slice(0, -4) + '万'
            } else {
                return x.playCount = playCounts
            }

        })


    },
    // 音乐url
    GETSONG(state, url) {
        state.url = url;
        // console.log(id);
        // console.log(state.url);

    },


};
const actions = {
        //轮播图数据
        async getBannerList({ commit }) {
            let res = await GetBannerListAPI();
            // console.log(res);
            if (res.code == 200) {
                commit("GETBANNERSLIST", res.banners);
            }
        },
        //推荐歌单
        async GetPersonalized({ commit }) {
            let res = await GetPersonalizedAPI({ limit: 10 });
            // console.log(res);
            if (res.code == 200) {
                commit("GETPERSONALIZED", res.result);
            }
        },
        //最新音乐
        async GetNewsong({ commit }) {
            let res = await GetNewsongAPI();
            // console.log(res);
            if (res.code == 200) {
                commit("GETNEWSONG", res.result);
            }
        },
        //推荐MV
        async GetMv({ commit }) {
            let res = await GetMvAPI();
            // console.log(res);
            if (res.code == 200) {
                commit("GETMV", res.result);
            }
        },
        //音乐url
        async GetSong({ commit }, id) {
            let res = await GetSongAPI(id);
            // console.log(res);
            if (res.code == 200) {
                commit("GETSONG", res.data[0].url);
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