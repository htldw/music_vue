// 封装发起的网络请求
import request from '@/utils/request'
// 封装网络请求的方法
// 顶部歌单区域
export const GetSongsheet = params => request({
        url: '/top/playlist/highquality',
        params
    })
    // 歌单列表
export const Getplaylists = params => request({
        url: '/top/playlist',
        params
    })
    // 最新音乐（新歌速递）
export const GetNewSongs = params => request({
        url: '/top/song',
        params
    })
    // mv
export const GetMvList = params => request({
    url: '/mv/all',
    params
})