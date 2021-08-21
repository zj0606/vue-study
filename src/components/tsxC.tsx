import { CreateElement } from "vue";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

// export default Vue.extend(options)
// class-style
// 猜测：希望得到一个组件构造函数, 解析class内部所有属性和方法，转换成上面的options
// 最后执行Ctor = Vue.extend(options)并返回
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!:string
  myclick(){
    console.log(this.msg);
  }
  render(h:CreateElement){
    return <div onClick={this.myclick}>{this.msg}</div>
  }
}