let ZVue;
// 1.创建vue-router类
class ZVueRouter {
    constructor (options){
        this.$options = options
        // 缓存path 和route 映射关系
        this.routeMap = {}
        this.$options.routes.forEach(route =>{
            this.routeMap[route.path] = route;
        })
        // const initial = window.location.hash.slice(1) || '/'
        // ZVue.util.defineReactive(this,'current',initial)
        
        this.current = window.location.hash.slice(1) || '/'
        ZVue.util.defineReactive(this,'matched',[])
        this.match()
        window.addEventListener('hashchange',this.onHashHandle.bind(this))
        window.addEventListener('load',this.onHashHandle.bind(this))
    }
    onHashHandle() {
        this.current = window.location.hash.slice(1) || '/';
        console.log(this.current)
        this.matched = []
        this.match()
    }
    match (routes) {
        routes = routes || this.$options.routes
        for (const route of routes) {
            if (route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }
            // /about
            // /about/info
            if (route.path !== '/' && this.current.indexOf(route.path) !=-1) {
                this.matched.push(route)
                if (route.children) {
                    this.match(route.children)
                }
                return
            }
        }
    }
    
}
// 在组件中 this.$router 访问路由实例 Vue.prototype.$router = 
// 实现两个全局组件 router-link  router-view
ZVueRouter.install = function (Vue){
    ZVue = Vue;
    // 1. Vue.prototype.$router
    Vue.mixin({
        beforeCreate () {
            if (this.$options.router){
                Vue.prototype.$router = this.$options.router;
            }
            
        },
    })


    // 2. 实现全局组件
    Vue.component('router-link',{
        props: {
            to: {
                type: String,
                required: true
            },
        },
        render(h){
            // <a href="#/xx">xx</a>

            return h('a',{attrs:{'href':'#'+this.to}},this.$slots.default)
        }
    })
    Vue.component('router-view',{
        render (h){
            // 1.
            // this 指向组件实例
            // const routes = this.$router.$options.routes
            // const route = routes.find(route=> route.path === this.$router.current)
            // const Comp = route.component
            // 2.
            // const {routeMap, current} = this.$router
            // const component = routeMap[current]?routeMap[current].component:null
            // 3.嵌套路由
            // 首先在router-view 组件中记录深度
            this.$vnode.data.routerView = true;
            let dep = 0;
            let parent = this.$parent;
            while (parent){
                if (parent.$vnode && parent.$vnode.data && parent.$vnode.data.routerView) {
                    dep++
                }
                parent = parent.$parent
            }
            let component = null
            if (this.$router.matched[dep]) {
                component = this.$router.matched[dep].component
            }
            
            return h(component)
        }
    })
}
export default ZVueRouter