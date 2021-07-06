<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
// 1.props,model rules
// 2. validate
    export default {
        name:'ZForm',
        componentName:'ZForm',
        provide(){
            return{
                form:this //表单实例传过去
            }
        },
        props: {
            model: {
                type: Object,
                required:true
            },
            rules:Object
        },
        data(){
            return {
                fields:[]//存放所有需要校验的ZFormItem
            }
        },
        methods: {
            validate(cb) {
                // const promises = this.$children.filter(item => item.prop)
                // .map(item =>item.validate())
                const promises = this.fields.map(field =>field.validate())
                Promise.all(promises).then(()=>cb(true))
                .catch(()=> cb(false))
            }
        },
        created(){
            this.$on('z-form-addField', field=>{
                this.fields.push(field)
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>