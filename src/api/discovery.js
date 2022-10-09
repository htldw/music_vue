// 封装发起的网络请求
import request from '@/utils/request'
// 封装网络请求的方法
// 轮播图
export const GetBannerList = params => request({
        url: '/banner',
        params
    })
    // 推荐歌单
export const GetPersonalized = params => request({
        url: '/personalized',
        params
    })
    // 最新音乐
export const GetNewsong = params => request({
        url: '/personalized/newsong',
        params
    })
    // 推荐MV
export const GetMv = params => request({
        url: '/personalized/mv',
        params
    })
    //  音乐url
export const GetSong = (id) => request({
    url: `/song/url?id=${id}`,
    method: "GET"
})