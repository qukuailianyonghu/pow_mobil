<style src="./index.css"></style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'
import BackgroundBall from '@/utils/canvas/background_ball.js'

export default {
    data() {
        return {
            viewWechatFlag: false,
            WIDTH: '',
            HEIGHT: ''
        }
    },
    components: {
        
    },
    methods: {
        joinTelegram() {

        },
        toFaceBook() {

        },
        toTwitter() {

        },
        toGithub() {

        },
        _isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        }
    },
    mounted() {
        this.WIDTH = window.innerWidth + 'px';
        this.HEIGHT = window.innerHeight + 'px';
        if (this._isMobile()) {
            this.$store.state.base.isPC = false;
        } else {
            this.$store.state.base.isPC = true;
        }
        let _canvas = this.$refs.footerCanvas;
        if(this.$store.state.base.isPC) {
            BackgroundBall.backgroundBall(_canvas, window.innerWidth, 480, false);
        } else {
            BackgroundBall.backgroundBall(_canvas, window.innerWidth, 480, false);
        }
        // BackgroundBall.backgroundBall(_canvas, window.innerWidth, 480, false);
    },
    computed: {
        isPC() {
            return this.$store.state.base.isPC
        }
    }
}
</script>
