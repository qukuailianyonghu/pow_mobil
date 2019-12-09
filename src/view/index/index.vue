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
          grate:0,
          mediaStreamTrack:null
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
      },
      openMedia(){
            alert("goods")
        let constraints = {
          video: { width: 500, height: 500 },
          audio: true
        };
        //获得video摄像头
        let video = document.getElementById('video');
        let promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then((mediaStream) => {
          this.mediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks()[1];
          video.srcObject = mediaStream;
          video.play();
        });
      },
      takePhoto(){
        //获得Canvas对象
        let video = document.getElementById('video');
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 500, 500);


        // toDataURL  ---  可传入'image/png'---默认, 'image/jpeg'
        let img = document.getElementById('canvas').toDataURL();
        // 这里的img就是得到的图片
        console.log('img-----', img);
        document.getElementById('imgTag').src=img;
      },
      closeMedia(){
        this.mediaStreamTrack.stop();
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
