<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld @add-feature="addFeature" @add-property="addProperty"
      msg="Welcome to Your Vue.js + TypeScript App"/>
    <!-- <TsxComp msg="Welcome to Your Vue.js + TypeScript App"></TsxComp> -->
    <!-- <TsxC msg="Welcome to Your Vue.js + TypeScript App + TsxC"></TsxC> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import TsxComp from './components/TsxComp';
import TsxC from './components/tsxC';
import { FeatureSelect } from './types';

@Component({
  components: {
    HelloWorld, TsxComp,TsxC
  },
})
export default class App extends Vue {
  addFeature(feature: FeatureSelect) {
    console.log('添加了一个新特性：', feature.name);
    
  }
  addProperty(property:FeatureSelect){
    console.log('添加了addProperty',property.name);
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
