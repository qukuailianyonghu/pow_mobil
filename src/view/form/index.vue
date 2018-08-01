<style src="./index.css" ></style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'

export default {
    data() {
        return {
            WIDTH: '',
            HEIGHT: '',
          pageDone: false,
          formVisible: false,
          email_message:'',
          title_message:'',
          type_message:'',
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
      submit_f(email,title,content,type) {
        this.$http.post(
          "https://web.2100pool.com/tokenbank/pow/dcr/a_worker_order",
          {
            email:email,
            title:title,
            content:content,
            type:type
          },
          {emulateJSON: true}
        ).then(response => {
          var status = response.body.status;
          if (0 != status) {
            this.results = -1;
          } else {
            this.results = 0;
          }
        }).catch((res) => {
          this.results = -1;
        })
      },
        submitHelpForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.submit_f(this.moreHelpForm.email,this.moreHelpForm.tit,this.moreHelpForm.describe,this.moreHelpForm.type);
                  this.formVisible = false;
                  // //提交成功
                    // this.$alert('提交成功', {
                    //     confirmButtonText: '确定',
                    //     callback: action => {
                    //         this.moreHelpForm = {
                    //             email: '',
                    //             tit: '',
                    //             describe: '',
                    //             type: '1'
                    //         }
                    //     }
                    // });
                    // //提交失败
                    // this.$alert('提交失败', {
                    //     confirmButtonText: '确定',
                    //     callback: action => {

                    //     }
                    // });
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
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
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
        },
        noticeIsClosed() {
            return this.$store.state.base.noticeIsClosed
        }
    }
}
</script>
