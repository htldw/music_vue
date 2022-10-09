import Vue from 'vue'
import App from './App.vue'
// 导入全局初始化样式
import './assets/index.css'

//全局组件
import Songsheet from '@/components/Songsheet'
import NewMusic from '@/components/NewMusic'
import Hotmv from '@/components/Hotmv'
import SongList from '@/components/SongList'
import Pager from '@/components/Pager'
import HotComment from '@/components/HotComment'


//时间过滤器
import filter from '@/utils/filter'
// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

// 全局组件（参数1：组件名字，参数2：该组件）
Vue.component(Songsheet.name, Songsheet)
Vue.component(NewMusic.name, NewMusic)
Vue.component(Hotmv.name, Hotmv)
Vue.component(SongList.name, SongList)
Vue.component(Pager.name, Pager)
Vue.component(HotComment.name, HotComment)


// 引入仓库
import store from '@/store'
// 统一接口api文件夹里面的请求函数
import * as API from '@/api'
// 路由整合
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入对应的路由
import discovery from './views/discovery.vue'
import playlist from './views/playlist.vue'
import playlists from './views/playlists.vue'
import newsongs from './views/newsongs.vue'
import mvs from './views/mvs.vue'
import mv from './views/mv.vue'
import searchresult from './views/searchresult.vue'

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/discovery'
        },
        {
            // 发现音乐
            path: '/discovery',
            component: discovery
        },
        {
            // 推荐歌单
            path: '/playlists',
            component: playlists
        },
        {
            // 推荐歌单
            path: '/playlist',
            component: playlist
        },
        {
            // 最新音乐
            path: '/newsongs',
            component: newsongs
        },
        {
            // 推荐mv
            path: '/mvs',
            component: mvs
        }, {
            // 搜素结果
            path: '/searchresult',
            component: searchresult
        },
        {
            // 推荐mv
            path: '/mv',
            component: mv
        },



    ]
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    // 全局事件总线
    beforeCreate() {
        //配置全局事件总线
        Vue.prototype.$bus = this;
        //通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
        Vue.prototype.$API = API;
    },
    // 挂载到Vue示例上
    router,
    //注册仓库 
    store,
    render: h => h(App),
}).$mount('#app')