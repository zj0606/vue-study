<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <!-- 新增特性 -->
    <div>
      <input type="text" @keyup.enter="addFeature" />
      <input type="text" @keyup.enter="addProperty" />
    </div>

    <!-- 特性列表 -->
    <ul>
      <li v-for="item in propertys" 
      :key="item.id"
      :class="{selected:item.selected}"
      >{{item.name}}</li>
      <li>total: {{total1}}</li>
    </ul>
  </div>
</template>
// 使用ts 要在script 标签上加上lang = ts
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { Feature, FeatureSelect } from "@/types";

// export default Vue.extend(options)
// class-style
// 猜测：希望得到一个组件构造函数, 解析class内部所有属性和方法，转换成上面的options
// 最后执行Ctor = Vue.extend(options)并返回
@Component
export default class HelloWorld extends Vue {
  // 加括号说明Prop是一个装饰器工厂，返回的才是装饰器，参数一般是配置对象
  // 以Prop为例子，就是给Vue传递props选项
  @Prop({type: String, required: true}) 
  private msg!: string; // 这行约束是写给ts编译器的
  
  info:string='';

  // 属性将成为data 中数据
  propertys: FeatureSelect[] = []
  // 默认的事件名就是方法名，返回值就是参数
  @Emit()
  addProperty(e:KeyboardEvent){
    const ipt = e.target as HTMLInputElement;
    const property:FeatureSelect = {
      id: this.propertys.length+1,
      name: ipt.value,
      selected: false
    }
    this.propertys.push(property)
    this.info = ipt.value
    ipt.value = ''
    // 告诉老爹派发一个addProperty 事件
    // 相当于 this.$emit('add-property',property)
    return property
  }
  @Watch('info')
  msgLog(msg:string) {
    console.log(msg);
    
  }


  // 属性将成为data中数据
  features: FeatureSelect[] = [];

  // 默认事件名称是方法名，返回值是参数
  @Emit()
  addFeature(e: KeyboardEvent) {
    // 类型断言
    const inp = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false
    };
    this.features.push(feature);
    inp.value = "";

    // 告诉老爹添加了一个Feature
    // 相当于this.$emit('add-feature', feature)
    return feature
  }

  // 生命周期
  created() {
    // this.features = [
    //   { id: 1, name: "类型注解", selected: false },
    //   { id: 2, name: "编译类型语言", selected: true }
    // ];
    // this.propertys = [{id:1,name:'类型推断',selected:true},{id:2,name: '类型注解',selected:false}]
  }

  // 存取器作为计算属性
  get total() {
    return this.features.length
  }
  get total1(){
    return this.propertys.length
  }

  mounted() {
    // 请求数据
    // this.$http.get<FeatureSelect[]>('/api/list').then(resp => {
    //   this.features = resp.data
    // })
    
    this.$http.get<FeatureSelect[]>('/api/list').then(resp =>{
      this.propertys = resp.data
    })
    
  }
}

// option-style
// import Vue from 'vue';
// export default Vue.extend({
//   data () {

//   }
// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}

.selected {
  background-color: rgb(187, 240, 244);
}
</style>
