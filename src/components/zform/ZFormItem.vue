<template>
    <div>
        <!-- label -->
        <label v-if="label">{{label}}</label>
        <!-- input -->
        <slot></slot>
        <p v-if="error" class="error">{{error}}</p>
        <!-- <p>{{form.rules[prop]}}</p>
        <p>{{form.model[prop]}}</p> -->
    </div>
</template>

<script>
import Schema from 'async-validator';
import emitter from '@/components/mixins/emitter'
    export default {
        name:'ZFormItem',
        componentName:'ZFormItem',
        inject:['form'],
        mixins:[emitter],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                error:''
            }
        },
        mounted(){
            this.$on('validate',()=>{
                this.validate()
            })
            if (this.prop){
                this.dispatch('ZForm','z-form-addField',[this])
            }
        },
        methods: {
            validate() {
                // console.log('validate')
                //加载一个校验库 async-validator
                // 获取校验规则 值
                const rules = this.form.rules[this.prop]
                const value = this.form.model[this.prop]
                const validator = new Schema({[this.prop]:rules})
                return validator.validate({[this.prop]: value}, (errors)=>{
                    if (errors){
                        this.error = errors[0].message
                    }else{
                        this.error = ''
                    }
                })
            }
        },
    }
</script>

<style scoped>
.error{
    color: red;
}
</style>