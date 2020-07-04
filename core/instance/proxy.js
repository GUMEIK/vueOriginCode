//代理对象
function constructObjectProxy(vm,obj,namespace) {
    let proxyObj = {};
    for(let prop in obj){
        console.log(prop);
        Object.defineProperty(proxyObj,prop,{
            configurable:true,
            get() {
                console.log("get")
                return obj[prop];
            },
            set(value) {
                console.log(prop)
                obj[prop] = value;
            }
        })
    //    往自己身上也设置代理
        Object.defineProperty(vm,prop,{
            configurable:true,
            get() {
                console.log("get")
                return obj[prop];
            },
            set(value) {
                console.log(prop)
                obj[prop] = value;
            }
        })
    }
    return proxyObj;
}

// vm Due对象
export function contructProxy(vm, obj, namespace) {
    let proxyObj = {};
    if (obj instanceof Array) {//判断代理的类型

    }else if(obj instanceof Object){
        proxyObj = constructObjectProxy(vm,obj,namespace);
    }else {
        throw new Error("Error");
    }
    return proxyObj;

}
