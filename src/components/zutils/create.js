// 传入组件实例，并挂载到body上
import Vue from 'vue';
export default function(Component, props){
    const vm = new Vue({
        render(h){
            return h(Component, { props })
        }
    }).$mount() //$mount 实际作用就是将Vdom=>dom
    //vm.$el 得到真实的dom结构
    document.body.appendChild(vm.$el);
// 得到组件实例
    const Comp = vm.$children[0]
    Comp.remove = ()=>{
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return Comp
}