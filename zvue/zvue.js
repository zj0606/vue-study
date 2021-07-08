function defineReactive(obj, key, val){
    const dep = new Dep()
    // 值为对象递归
    observe(val)
    Object.defineProperty(obj, key, {
        get(){
            console.log('get', val);
            Dep.target && dep.addWatcher(Dep.target)
            return val;
        },
        set(newVal){
            if(newVal !== val){
                console.log('set', newVal);
                observe(newVal)
                val = newVal;
                dep.notify()
                // addWatchr.forEach(watcher =>{
                //     watcher.update(val)
                // })
            }
            
        }
    })
}
function observe(obj){
    // 判断obj的值，必须是object
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    new Observer(obj)
}
// 就是将$data 中的key 代理到vm的实例上
function proxy(vm) {
    Object.keys(vm.$data).forEach(key=>{
        Object.defineProperty(vm, key, {
            get(){
                return vm.$data[key]
            },
            set(v){
                vm.$data[key] = v
            }
        })
    })
}
class ZVue{
    constructor (options){
        this.$options = options
        this.$data = options.data

        // 响应式
        observe(this.$data)
        // 代理
        proxy(this)

        // 编译
        new Compile(options.el, this)
    }
}
// 每一个响应式对象，半生一个Observer实力
 class Observer{
    constructor(value){
        this.value = value

        // 判断value 是对象还是数组 
        this.walk(value)
    }
    walk(obj){
        Object.keys(obj).forEach(key =>{
            defineReactive(obj, key, obj[key])
        })
    }
 }

//  编译
// new Compile(el,vm)
class Compile{
    constructor(el, vm){
        this.$vm = vm
        this.$el = document.querySelector(el)
        // 编译模板
        if (this.$el) {
            this.compile(this.$el)
        }
    }
    compile (el) {
        // 递归遍历el 
        el.childNodes.forEach(node=>{
        // 判断其类型
            if (this.isElement(node)) {
                // console.log('编译元素',node.nodeName);
                this.compileElement(node)
            } else if(this.isInter(node)) {
                // console.log('编译差值表达式',node.textContent);
                this.compileText(node)
            }
            if (node.childNodes) {
                this.compile(node)
            }
        })
    }
    // 编译元素
    compileElement(node){
        // z-text="aaa"
        Array.from(node.attributes).forEach(attr => {
            const attrName = attr.name;
            const exp = attr.value
            if (attrName.indexOf('z-') != -1) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, exp)
                
            }else if (attrName.indexOf('@') != -1) {
                // @click="add"
                const dir = attrName.substring(1)
                this[dir] && this[dir](node, exp)
            }
        })
    }
    text(node, exp){
        // node.textContent = this.$vm[exp]
        this.update(node, exp, 'text')
    }
    html(node, exp){
        this.update(node, exp, 'html')
        // node.innerHTML = this.$vm[exp]
    }
    model(node, exp){
        
        this.update(node, exp, 'model')
        node.addEventListener("input", (function(e){
            this.$vm[exp] = e.target.value
        }).bind(this));
    }
    click(node, exp){
        node.addEventListener('click',(function(){
            this.$vm.$options.methods[exp] && this.$vm.$options.methods[exp].call(this.$vm)
        }).bind(this))
    }
    // 编译插值表达式
    compileText(node){
        this.update(node, RegExp.$1, 'text')
        // node.textContent = this.$vm[RegExp.$1]
    }
    // 所有涉及到动态数据绑定的 都需要创建更新函数和Watcher实例

    update(node, exp, dir){
        const fn = this[dir+"Updater"]
        //初始化
        fn && fn(node, this.$vm[exp])
        // 更新
        // 创建watcher实例
        new Watcher(this.$vm, exp, function(val){
            fn && fn(node,val)
        })

    }
    textUpdater(node,value){
        node.textContent = value
    }
    htmlUpdater(node, value){
        node.innerHTML = value
    }
    modelUpdater(node, value){
        node.value = value
    }
    // 元素
    isElement(node){
        return node.nodeType === 1
    }
    // 编译插值表达式{{XXX}}
    isInter(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/g.test(node.textContent)
    }
}
const addWatchr = []
// 观察者
class Watcher{
    constructor(vm, key, updateFn){
        this.vm = vm
        this.key = key
        this.updateFn = updateFn
        addWatchr.push(this)
        // 读一次数据触发 defineReactive里面的get()
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }
    update(){
        this.updateFn && this.updateFn.call(this.vm,this.vm[this.key])
    }
}

class Dep{
    constructor(){
        this.watchers = []
    }
    addWatcher(watcher){
        this.watchers.push(watcher)
    }
    notify(){
        this.watchers.forEach(watcher => watcher.update())
    }
}
