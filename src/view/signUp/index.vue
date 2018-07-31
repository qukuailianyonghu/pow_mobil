<style src="./index.css"></style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'
import utils from '@/utils/utils.js'
import BackgroundBall from '@/utils/canvas/background_ball.js'
import CheckLocation from '@/components/checkLocation/index'

export default {
    data() {
        return {
            bgDown: false,
            userName: '',
            email: '',
            password: '',
            repassword: '',
            checkedTerms: false
        }
    },
    components: {
        checkLocation: CheckLocation
    },
    methods: {
        toLogin() {
            this.$router.push({ path: '/signin' })
        },
        toRegister() {

        },
        toViewTerms() {
            
        }
    },
    mounted() {
        let _canvas = this.$refs.signCanvas;
        BackgroundBall.backgroundBall(_canvas, window.innerWidth, window.innerHeight, true);
        
        setTimeout(() => {
            this.bgDown = true;
        }, 1000)
    }
}
</script>
