<style src="./index.css"></style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'
import BackgroundBall from '@/utils/canvas/background_ball.js'

export default {
    data() {
        return {
            pageDone: false,
            progress: '80%',
            profitFlag: false,
            profitFlagM: false,
            WIDTH: '',
            HEIGHT: '',
          input1:'',
          input2:1,
          grate:0
        }
    },
    components: {

    },
    methods: {
        getStart() {
            this.$router.push({ path: '/help' });
        },
        toFindMore() {
            this.$router.push({ path: '/help' });
        },
        toJisuanProfit() {
          this.input1 = 1;
          this.input2 = this.grate;
          this.profitFlag = true;
            if(this.isPC) {
                this.profitFlag = true;
            } else {
                this.profitFlagM = true;
            }
        },
      getRate() {
        this.$http.post(
          "https://web.2100pool.com/tokenbank/pow/dcr/get_calator",
          { },
          {emulateJSON: true}
        ).then(response => {
          this.grate = parseFloat(response.body.data.grate).toFixed(8);
        }).catch((res) => {
        })
      }
    },
    mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.WIDTH = window.innerWidth + 'px';
        this.HEIGHT = window.innerHeight + 'px';
        let _canvas = this.$refs.indexCanvas;
        if(this.isPC) {
            BackgroundBall.backgroundBall(_canvas, window.innerWidth, 560, false);
        } else {
            BackgroundBall.backgroundBall(_canvas, window.innerWidth, window.innerHeight - 300, false);
        }
        // BackgroundBall.backgroundBall(_canvas, window.innerWidth, 560, false);
      this.getRate();
        setTimeout(() => {
            this.pageDone = true;
        }, 100)
    },
    computed: {
        isPC() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return !flag;
            // return this.$store.state.base.isPC
        }
    },
  watch:{
    input1:function () {
      this.input2 = parseFloat(this.input1 * this.grate).toFixed(8);

    }
  }
}
</script>
