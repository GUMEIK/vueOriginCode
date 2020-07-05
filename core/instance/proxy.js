//代理对象
function constructObjectProxy(vm,obj,namespace) {
    let proxyObj = {};
    for(let prop in obj){
        Object.defineProperty(proxyObj,prop,{
            configurable:true,
            get() {
                return obj[prop];
            },
            set(value) {
                console.log(getNameSpace(namespace,prop))
                obj[prop] = value;
            }
        })
    //    往Due自己身上也设置代理
        Object.defineProperty(vm,prop,{
            configurable:true,
            get() {
                return obj[prop];
            },
            set(value) {
                console.log(getNameSpace(namespace,prop))
                obj[prop] = value;
            }
        })
        //如果对象的属性是对象的话，继续进行代理这个属性
        if(obj[prop] instanceof Object){
            proxyObj[prop] = contructProxy(vm,obj[prop],getNameSpace(namespace,prop))
        }
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

function getNameSpace(nowNameSpace,nowProp) {
    if(nowNameSpace == null || nowNameSpace === ""){
        return nowProp;
    }else if(nowProp == null || nowProp === ""){
        return nowNameSpace;
    }else {
        return nowNameSpace + '.' + nowProp;
    }
}
