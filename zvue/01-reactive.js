//实现响应式
// vue2:Object.defineProperty(obj,key,desc)
//vue3: new Proxy()
// 设置obj的key 拦截它，初始值为val
function defineReactive(obj, key, val){
    // 值为对象递归
    observe(val)
    Object.defineProperty(obj, key, {
        get(){
            console.log('get', val);
            return val;
        },
        set(newVal){
            if(newVal !== val){
                console.log('set', newVal);
                observe(newVal)
                val = newVal;
            }
        }
    })
}
function observe(obj){
    // 判断obj的值，必须是object
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    Object.keys(obj).forEach(key =>{
        defineReactive(obj, key, obj[key])
    })
}
// 设置新属性必须通过set 方法
function set(obj, key, val){
    defineReactive(obj, key, val)
}
// 对obj做响应式
// const obj = {}
// defineReactive(obj, 'foo', 'f0000')
// defineReactive(obj, 'bar', 'bar')

const obj = {
    foo:'fooo',
    bar:'bar',
    baz:{a:1}
}
observe(obj);
// obj.foo
// obj.foo = 'foooo'
// obj.bar
// obj.baz.a
// obj.baz.a = 20
// obj.baz = {a:20}
// obj.baz.a
// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong