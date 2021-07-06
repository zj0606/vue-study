<template>
  <div>
    父亲的数据{{$attrs.msg}}
      <Child2 v-bind="$attrs" />
  </div>
</template>

<script>
import Child2 from "./Child2.vue";
export default {
 components:{
     Child2
 }
}
</script>

<style>

</style>