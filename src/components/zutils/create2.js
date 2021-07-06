import Vue from 'vue'
// Vue.extend() 实现
// 传入组件配置对象得到的是构造函数
export default function (Component, props){
    const Ctor = Vue.extend(Component);
    const Comp = new Ctor({
        propsData: props
    })//得到组件实例
    
    Comp.$mount()// 执行空挂在 得到dom
    document.body.appendChild(Comp.$el)
    Comp.remove = ()=>{
        document.body.removeChild(Comp.$el)
        Comp.$destroy()
    }
    return Comp
}