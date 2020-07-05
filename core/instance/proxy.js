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
const arrayProto = Array.prototype;
//代理数组函数
function defArrayFunc(obj,func,namespace,vm) {
    Object.defineProperty(obj,func,{
        enumerable:true,
        configurable:true,
        value:function (...args) {
            let original = arrayProto[func];
            let result = original.apply(this,args);
            console.log(getNameSpace(namespace,""))
            return result;
        }
    })
}
//代理数组
function proxyArr(vm,arr,namespace) {
    let obj = {
        eleType:"Array",
        toString:function () {
            let result = "";
            for(let i = 0;i < arr.length;i++){
                result += arr[i] + ', ';
            }
            return result.substring(0,arr.length - 2);
        },
        push(){

        },
        pop(){

        },
        shift() {

        },
        unshift() {

        }
    };
    defArrayFunc.call(vm,obj,"push",namespace,vm)
    defArrayFunc.call(vm,obj,"pop",namespace,vm)
    defArrayFunc.call(vm,obj,"shift",namespace,vm)
    defArrayFunc.call(vm,obj,"unshift",namespace,vm)
    arr.__proto__ = obj;
    return arr;
}
// vm Due对象
export function contructProxy(vm, obj, namespace) {
    let proxyObj = null;
    if (obj instanceof Array) {//判断代理的类型
        proxyObj = new Array(obj.length);
        //代理数组的每一个元素
        for(let i = 0;i < obj.length;i++){
            proxyObj[i] = contructProxy(vm,obj[i],namespace)
        }
    //    代理整个数组
        proxyObj = proxyArr(vm,obj,namespace);
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
