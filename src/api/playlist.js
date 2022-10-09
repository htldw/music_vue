// 封装发起的网络请求
import request from '@/utils/request'
// 封装网络请求的方法
// 歌单详情
export const GetPlaylist = (id) => request({
    url: `/playlist/detail?id=${id}`,
    method: "GET"
})

// 获取评论
export const GetComment = params => request({
        url: `/comment/hot`,
        method: "GET",
        params
    })
    // 获取最新评论
export const GetNewComment = params => request({
        url: `/comment/playlist`,
        method: "GET",
        params
    })
    // 获取搜索
export const GetSearch = params => request({
    url: `/cloudsearch`,
    method: "GET",
    params
})