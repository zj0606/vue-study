let ZVue;
class Store {
    constructor(options){
        this.$options = options;
        this._wrapGetters = options.getters;

        const computed = {}
        const store = this
        this.getters = {}
        Object.keys(this._wrapGetters).forEach(key => {
            const fn = store._wrapGetters[key]
            computed[key] = function (){
                return fn(store.state)
            }
            Object.defineProperty(store.getters,key,{
                get:()=>  store._vm[key]
            })
        })
        // 实现响应式数据
        this._vm = new ZVue({
            data(){
                return {
                    // 不做代理
                    $$data: options.state
                }
            },
            computed
        })
        // ZVue.util.defineReactive(this,'state',this.$options.state)
        // 缓存mutations 
        this._mutations = options.mutations
        this._actions = options.actions
        // this.commit = this.commit.bind(this)
        // this.dispatch = this.dispatch.bind(this);
        const {commit, dispatch} = this;
        this.commit = function (type, payload){
            commit.call(this,type, payload)
        }
        this.dispatch = function (type, payload){
            dispatch.call(this,type, payload)
        }
    }
    get state(){
        return this._vm._data.$$data
    }
    set state (v){
        console.error('请使用repalceState重置state');
    }
    // 实现commit(type,payload)
    commit (type, payload){
        const entry = this._mutations[type]
        if (!entry){
            console.error('请使用正确的mutation 类型');
            return
        }
        entry(this.state,payload)
    }
    // 实现dispatch(type,payload)
    dispatch(type, payload){
        const entry = this._actions[type]
        if (!entry){
            console.error('请使用正确的action type');
            return
        }
        return entry(this,payload)
    }
}
function install (Vue){
    ZVue = Vue;
    // Vue.prototype.$Store 
    Vue.mixin({
        beforeCreate () {
            if (this.$options.store){
                Vue.prototype.$store = this.$options.store;
            }
        },
    })

}
// 此处Vuex  可以看做是对象
export default {Store, install}