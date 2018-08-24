<style src="./index.css"></style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'
import Notice from '@/components/notice/index'

export default {
    props: {
        haveColor: {
            type: Boolean,
            default: true
        },
        activePath: {
            type: String,
            default: '/'
        },
        isFixed: {
            type: Boolean,
            default: false
        },
        haveNotice: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            viewProfitFlag: false,
            menuFlag: false,
            coinAddress: '',
            value:''
        }
    },
    components: {
        notice: Notice
    },
    methods: {
        toHomePage() {
            this.$router.push({ path: '/' })
            this.menuFlag = false;
        },
        toHelpPage() {
            this.$router.push({ path: '/help' })
            this.menuFlag = false;
        },
        toProfitPage() {
            this.$router.push({ path: '/profit' })
        },
        toViewProfit() {
            if(this.value != '') {
                // localStorage.setItem("coinAddress", this.value);
                this.$router.push({ path: '/profit',query: { address: this.value }});
                this.viewProfitFlag = false;
            } else {
                this.$notify.error({
                    title: '错误',
                    message: '请输入正确的DCR地址'
                });
            }
        },
        triggerMenu() {
            this.menuFlag = !this.menuFlag;
        },
        toForm() {
            this.$router.push({ path: '/form' })
            this.menuFlag = false;
        },
        searchAddress() {
            if(this.value != '') {
                this.menuFlag = false;
                //   localStorage.setItem("coinAddress", this.value);
                this.$router.push({ path: '/addressDetails',query: { address: this.value }});
            } else {
                this.$message.error('请输入正确的DCR地址');
                // this.$notify.error({
                //     title: '错误',
                //     message: '请输入正确的地址'
                // });
            }
        }
    },
    mounted() {

    },
    computed: {
        isPC() {
            return this.$store.state.base.isPC
        }
    }
}
</script>
