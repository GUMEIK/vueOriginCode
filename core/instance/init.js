import Due from './index.js';
import {mount} from './mount.js'
import { contructProxy } from './proxy.js'
let uid = 0;
export function initMixin(Due) {
    Due.prototype._init = function(options) {
        const vm = this;
        vm.uid = uid++;
        vm._isDue = true;
        // 初始化data
        if (options && options.data) {
            vm._data = contructProxy(vm, options.data, "")
        }
        // 初始化created

        // 初始化methods

        // 初始化computed

        // 初始化el并挂载
        if(options && options.el){
            let rootDom = document.getElementById(options.el);//真实dom根节点
            mount(rootDom);
        }
    }
}
