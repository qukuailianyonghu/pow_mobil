<style src="./index.css"></style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'
// import vueSeamless from 'vue-seamless-scroll'

export default {
    data() {
        return {
          noticeOn: true,
            listData: [{
                'title': '无缝滚动第一行无缝滚动第一行',
                'date': '2017-12-16'
              }, {
                'title': '无缝滚动第二行无缝滚动第二行',
                'date': '2017-12-16'
              }, {
                'title': '无缝滚动第三行无缝滚动第三行',
                'date': '2017-12-16'
              }, {
                'title': '无缝滚动第四行无缝滚动第四行',
                'date': '2017-12-16'
              }, {
                'title': '无缝滚动第五行无缝滚动第五行',
                'date': '2017-12-16'
              }, {
                'title': '无缝滚动第六行无缝滚动第六行',
                'date': '2017-12-16'
              }, {
                'title': '无缝滚动第七行无缝滚动第七行',
                'date': '2017-12-16'
              }, {
                'title': '无缝滚动第八行无缝滚动第八行',
                'date': '2017-12-16'
              }, {
                'title': '无缝滚动第九行无缝滚动第九行',
                'date': '2017-12-16'
            }]
        }
    },
    mounted(){
      this.httpPost();
    },
    methods: {
        closeNotice() {
          this.noticeOn = false;
          this.$store.state.base.noticeIsClosed = true;
        },
      httpPost() {
        this.$http.post(
          "https://web.2100pool.com/tokenbank/pow/dcr/get_announcement",
          { },
          {emulateJSON: true}
        ).then(response => {

          this.listData = response.body.data.announcement;

        }).catch((res) => {

        })
      }
    },
    components: {
        // vueSeamless
    },
    computed: {
  classOption: function () {
            return {
                step: .2,
                limitMoveNum: 5
            }
        },
        isPC() {
            return this.$store.state.base.isPC
        }
    }
}
</script>
