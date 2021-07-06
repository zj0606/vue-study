<template>
  <div>
      <ZForm :model="model" :rules="rules" ref="ZForm">
          <ZFormItem label="用户名" prop="username">
              <ZInput v-model="model.username" placeholder="请输入用户名"></ZInput>
          </ZFormItem>
          <ZFormItem label="密码" prop="password">
              <ZInput v-model="model.password" placeholder="请输入用密码"></ZInput>
          </ZFormItem>
          <ZFormItem>
              <button @click="login">登录</button>
          </ZFormItem>
      </ZForm>
      <!-- <p>{{model}}</p> -->
  </div>
</template>

<script>
import ZInput from '@/components/zform/ZInput.vue';
import ZFormItem from '@/components/zform/ZFormItem.vue';
import ZForm from '@/components/zform/ZForm.vue';
// import create from '@/components/zutils/create.js';
import create from '@/components/zutils/create2.js';
import Notice from '@/components/Notice.vue';
export default {
    components:{
        ZInput,ZFormItem,ZForm
    },
    data(){
        return{
            model:{
                username:'zj',
                password:''
            },
            rules:{
                username:[
                    {required:true,message:'请输入用户名'}
                ],
                password:[
                    {required:true,message:'请输入用密码'}
                ]
            }
        }
    },
    methods: {
        login() {
            //全局校验
            this.$refs.ZForm.validate(valid =>{
                create(Notice,{
                    title:'借鸡生蛋',
                    message:valid?'测试看看鸡蛋':'失败了',
                    duration:3000
                }).show()
                // if(valid){
                //     console.log('校验通过')
                // }else {
                //     console.log('失败')
                // }
            })
        }
    },
}
</script>

<style>

</style>