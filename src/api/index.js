import { GetBannerList, GetPersonalized, GetNewsong, GetMv, GetSong } from '@/api/discovery'
import { GetPlaylist, GetComment, GetNewComment, GetSearch } from '@/api/playlist'
import { GetSongsheet, Getplaylists, GetNewSongs, GetMvList } from '@/api/songsheet'
import { GetMvUrl, GetUrl, GetMvDetail, GetArtists, GetMvComment } from '@/api/mv'


export const GetBannerListAPI = GetBannerList //轮播图
export const GetPersonalizedAPI = GetPersonalized //推荐歌单
export const GetNewsongAPI = GetNewsong //最新音乐
export const GetMvAPI = GetMv //推荐MV
export const GetSongAPI = GetSong //音乐url
export const GetPlaylistAPI = GetPlaylist //歌单详情
export const GetCommentAPI = GetComment //歌单评论
export const GetNewCommentAPI = GetNewComment //歌单新评论
export const GetSearchAPI = GetSearch //搜素
export const GetSongsheetAPI = GetSongsheet //推荐歌单页
export const GetplaylistsAPI = Getplaylists //推荐歌单列表
export const GetNewSongsAPI = GetNewSongs //最新音乐
export const GetMvListAPI = GetMvList //mv列表
export const GetMvUrlAPI = GetMvUrl //mv地址
export const GetUrlAPI = GetUrl //相关mv
export const GetMvDetailAPI = GetMvDetail //mv详情
export const GetArtistsAPI = GetArtists //歌手信息
export const GetMvCommentAPI = GetMvComment //mv评论