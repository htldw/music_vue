// 封装发起的网络请求
import request from '@/utils/request'
// 封装网络请求的方法
//mv地址
export const GetMvUrl = params => request({
        url: '/mv/url',
        params
    })
    // 获取相关mv地址
export const GetUrl = params => request({
        url: '/simi/mv',
        params
    })
    // 获取mv信息
export const GetMvDetail = params => request({
        url: '/mv/detail',
        params
    })
    // 获取歌手信息
export const GetArtists = params => request({
        url: '/artists',
        params
    })
    // 获取歌手信息
export const GetMvComment = params => request({
    url: '/comment/mv',
    params
})