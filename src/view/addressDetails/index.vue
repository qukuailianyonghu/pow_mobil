<style src="./index.css"></style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'

let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require("echarts/lib/component/legend")

export default {
    data() {
        return {
            targetAddress: '',
            WIDTH: '',
            HEIGHT: '',
            activeTab: 0,
            minerList: [],
            paymentList: [
            ],
            minerListCurrentPage: 1,
            minerListPageSize: 10,
            minerListTotal: 0,
            paymentListCurrentPage: 1,
            paymentListPageSize: 10,
            paymentListTotal: 0,
          addresses: '',
          notPaidReward : "0.0",
          selectTotalPaied : "0.0",
          totalOneHour : "0.0",
          totalReard : "0.0",
          totalTwentyfour : "0.0",
          username : "",
          workerAccount : 0,
          workeringAccount : 0,
          yesterdayTwentyfour : "0.0",
          chartData:[]
        }
    },
    components: {

    },
    methods: {
        _isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        drawLine(chatdata) {
            // 基于准备好的dom，初始化echarts实例
            let myEChart = echarts.init(this.$refs.profitECharts)
            // 绘制图表
            myEChart.setOption({
                title: {
                    text: '过去24小时算力',
                    left: 'right',
                    textStyle: {
                        color: '#195BDD',
                        fontSize: 25,
                    }
                },
                legend:{
                    // type: 'plain',
                    x: 690,
                    y: 30,
                    data: [{
                        name: 'decred（Ghash/s）',
                        icon: 'circle',
                        textStyle: {fontWeight: 'bold', color: '#5E6875'},
                    }],
                    selectedMode: false,
                    textStyle: {
                        fontSize:25
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontSize: 25,
                        lineHeight: 25,
                        color: '#333'
                    },
                    backgroundColor: '#fff',
                    borderColor: '#333',
                    borderWidth: 1,
                    formatter(params) {
                        params = params[0];
                        return params.data.name + '<br /><strong>' + params.data.value[1] + '  ' + params.seriesName + '</strong>'
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                    splitNumber: 12,
                    boundaryGap: false,
                    minInterval: 1,
                    maxInterval: 3600 * 24 * 1000,
                    axisLabel: {
                        formatter: (params) => {
                            let date = new Date(params)
                            return this.reSetStr(date.getHours()) + ':' + this.reSetStr(date.getMinutes())
                        },
                        fontSize: 16
                    }
                },
                yAxis: {
                    axisLabel: {
                        fontSize: 16
                    }
                },
                series: [{
                    name: 'decred（Ghash/s）',
                    type: 'line',
                    //数据
                    data: chatdata,
                    lineStyle: {
                        color: '#2F6BE1'
                    },
                    itemStyle: {
                        color: '#2F6BE1'
                    },
                    areaStyle: {
                        color: '#E3EBFB'
                    }
                }]
            });
        },
        reSetStr(str) {
            let _str = str + '';
            if(_str.length == 1) {
                return '0' + _str;
            } else {
                return _str;
            }
        },
        clickTab(val) {
            this.activeTab = val;
        },
        handleMinerListCurrentChange(val) {
          this.getWorkerList(this.addresses,val,this.minerListPageSize);
          this.minerListCurrentPage = val;
            //请求接口
        },
        handlePaymentListCurrentChange(val) {
            this.getRewardTx(this.addresses,val,this.paymentListPageSize);
            this.paymentListCurrentPage = val;
            //请求接口
        },
      httpPost(addresses) {
        this.$http.post(
          "https://web.2100pool.com/tokenbank/pow/dcr/get_income",
          {address:addresses},
          {emulateJSON: true}
        ).then(response => {

          this.chartData = response.body.data.chatdata;
          this.drawLine(this.chartData);
        }).catch((res) => {

        })
      },
      getRewardTx(addresses,currentPages,sizes) {
        this.$http.post(
          "https://web.2100pool.com/tokenbank/pow/dcr/query_reward_tx",
          {
            address:addresses,
            currentPage:currentPages,
            size:sizes
          },
          {emulateJSON: true}
        ).then(response => {
          this.paymentList = response.body.data.txlist;
          this.paymentListCurrentPage = parseInt(response.body.data.current_page);
          this.paymentListTotal = parseInt(response.body.data.records);
        }).catch((res) => {

        })
      },
      getWorkerList(addresses,currentPages,sizes) {
        this.$http.post(
          "https://web.2100pool.com/tokenbank/pow/dcr/query_worker_page",
          {
            address:addresses,
            currentPage:currentPages,
            size:sizes
          },
          {emulateJSON: true}
        ).then(response => {
          this.minerList = response.body.data.minerList;
          this.minerListCurrentPage = parseInt(response.body.data.current_page);
          this.minerListTotal = parseInt(response.body.data.records);
        }).catch((res) => {

        })
      },
      //获取回报信息
      getRewardInfo(addresses) {
        this.$http.post(
          "https://web.2100pool.com/tokenbank/pow/dcr/query_reward_info",
          {
            address:addresses
          },
          {emulateJSON: true}
        ).then(response => {
          this.notPaidReward = response.body.data.notPaidReward;
          this.selectTotalPaied = response.body.data.selectTotalPaied;
          this.totalOneHour = response.body.data.totalOneHour;
          this.totalReard = response.body.data.totalReard;
          this.totalTwentyfour = response.body.data.totalTwentyfour;
          this.workerAccount = response.body.data.workerAccount;
          this.workeringAccount = response.body.data.workeringAccount;
          this.yesterdayTwentyfour = response.body.data.yesterdayTwentyfour;
        }).catch((res) => {

        })
      }
    },
    mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.addresses=this.$route.query.address;

        this.getRewardInfo(this.addresses);
        this.httpPost(this.addresses);
        this.getRewardTx(this.addresses,this.paymentListCurrentPage,this.paymentListPageSize);
        this.getWorkerList(this.addresses,this.minerListCurrentPage,this.minerListPageSize);

        this.WIDTH = window.innerWidth + 'px';
        this.HEIGHT = window.innerHeight + 'px';
        if (this._isMobile()) {
            this.$store.state.base.isPC = false;
        } else {
            this.$store.state.base.isPC = true;
        }
        //获取要查询的地址
        if(localStorage.getItem("coinAddress") != null) {
            this.targetAddress = localStorage.getItem("coinAddress")
        }

    },
    computed: {

        isPC() {
            return this.$store.state.base.isPC;
        },
        noticeIsClosed() {
            return this.$store.state.base.noticeIsClosed
        }

    }
}
</script>
