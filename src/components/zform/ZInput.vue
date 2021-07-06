<template>
  <div>
      <!-- 输入值value 输出input -->
      <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
import emitter from '@/components/mixins/emitter';
export default {
    name:"ZInput",
    componentName:'ZInput',
    inheritAttrs:false,
    props:{
        value:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'text'
        }
    },
    mixins:[emitter],
    methods:{
        onInput(e){
            this.$emit('input',e.target.value);
            // 数据校验
            // this.$parent.$emit('validate')
            this.dispatch('ZFormItem','validate')
        }
    }
}
</script>

<style>

</style>