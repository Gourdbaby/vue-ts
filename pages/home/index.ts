import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';   // 不能使用 分模块导入 ‘element-ui’ ts 会报错，不知所以然。

Vue.use(ElementUI)

import index from './index.vue';

window.onload = function(){
    var app = new Vue({
        el:"#cont",
        render: function(createElement: any){
        return createElement(index)
        }
    })
}