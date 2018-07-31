<style src="./index.css"></style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'

export default {
    data() {
        return {
            WIDTH: '',
            HEIGHT: '',
            moreHelpForm: {
                email: '',
                tit: '',
                describe: '',
                type: '1'
            },
            moreHelpFormRules: {
                email: [
                    { required: true, message: '请输入您的邮箱', trigger: 'blur' }
                ],
                tit: [
                    { required: true, message: '请输入您的问题标题，让我们能更快帮助到您', trigger: 'blur' }
                ],
                describe: [
                    { required: true, message: '请输入您的问题描述，让我们能更准确获得您的需求', trigger: 'blur' }
                ]
            },
        }
    },
    components: {
        
    },
    methods: {
        toIndex() {
            this.$router.push({ path: '/' });
        },
        submitHelpForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('验证完毕，接口提交');
                    //接口提交成功后关闭表单
                    this.formVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        _isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
    },
    mounted() {
        this.WIDTH = window.innerWidth + 'px';
        this.HEIGHT = window.innerHeight + 'px';
        if (this._isMobile()) {
            this.$store.state.base.isPC = false;
        } else {
            this.$store.state.base.isPC = true;
        }
    },
    computed: {
        isPC() {
            return this.$store.state.base.isPC
        }
    }
}
</script>
