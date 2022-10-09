import { GetMvUrlAPI, GetUrlAPI, GetMvDetailAPI, GetArtistsAPI, GetMvCommentAPI } from '@/api/index'

// home模块小仓库
const state = {
    //state 数据默认初始值别瞎写，服务器返回对象，服务器返回数组
    //mv地址
    url: '',
    //相关mv
    simiMvs: '',
    //mv详情
    mvInfo: '',
    //歌手id
    uid: '',
    //歌手头像 
    icon: '',
    //mv热门评论
    hotComments: [],
    //mv精彩评论个数
    hotTotal: 0,
    //mv评论
    comments: [],
    //评论个数
    total: 0



};
const mutations = {
    //mv地址
    GETMVURL(state, res) {
        state.url = res.url;
        // console.log(state.topList);
    },
    //相关mv
    GETURL(state, res) {
        state.simiMvs = res;
        // console.log(res);
        state.simiMvs.forEach(x => {
            let playCounts = x.playCount
            playCounts = playCounts.toString()
            if (playCounts.length > 4) {
                return x.playCount = playCounts.slice(0, -4) + '万'
            } else {
                return x.playCount = playCounts
            }

        })
    },
    //mv详情
    GETMVDETAIL(state, res) {
        state.mvInfo = res;
        state.uid = res.artistId
            // console.log(res.playCount);
        let playCounts = res.playCount
            // console.log(playCounts);
        playCounts = playCounts.toString()
        if (playCounts.length > 4) {
            return res.playCount = playCounts.slice(0, -4) + '万'
        } else {
            return res.playCount = playCounts
        }

    },
    //歌手信息
    GETARTISTS(state, res) {
        // console.log(res.picUrl);
        state.icon = res.picUrl;
        // console.log(state.mvInfo);
    },
    //mv评论
    GETMVCOMMENT(state, res) {
        // state. = res.picUrl;
        // console.log(res);
        state.hotComments = res.hotComments;
        state.comments = res.comments;
        state.total = res.total;
        state.hotTotal = res.hotComments.length;


    },

};
const actions = {
        //mv地址
        async GetMvUrl({ commit }, id) {
            let res = await GetMvUrlAPI(id);
            // console.log(res);
            if (res.code == 200) {
                commit("GETMVURL", res.data);
            }
        },
        //获取相关mv
        async GetUrl({ commit }, mvid) {
            let res = await GetUrlAPI(mvid);
            // console.log(res);
            if (res.code == 200) {
                commit("GETURL", res.mvs);
            }
        },
        //mv详情
        async GetMvDetail({ commit }, mvid) {
            let res = await GetMvDetailAPI(mvid);
            // console.log(res);
            if (res.code == 200) {
                commit("GETMVDETAIL", res.data);
            }
        },
        //歌手信息
        async GetArtists({ commit }, id) {
            let res = await GetArtistsAPI(id);
            // console.log(res);
            if (res.code == 200) {
                commit("GETARTISTS", res.artist);
            }
        },
        //mv评论
        async GetMvComment({ commit }, data) {
            let res = await GetMvCommentAPI(data);
            // console.log(res);
            if (res.code == 200) {
                commit("GETMVCOMMENT", res);
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