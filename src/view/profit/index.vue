<style src="./index.css"></style>

<template src="./index.html"></template>

<script>
  import domain from '@/utils/domain.js'

  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')


  export default {
    data() {
      return {
        activeTab: 0,
        minerList: [

        ],
        paymentList: [

        ],
        minerListCurrentPage: 1,
        minerListPageSize: 10,
        minerListTotal: 100,
        paymentListCurrentPage: 1,
        paymentListPageSize: 10,
        paymentListTotal: 100,
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
      drawLine(chatdata) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.profitCharts)
        // 绘制图表
        myChart.setOption({
          title: {
            text: '过去24小时算力',
            left: 'right',
            textStyle: {
              color: '#195BDD',
              fontSize: 14,
            }
          },
          tooltip: {
            trigger: 'axis',
            textStyle: {
              fontSize: 12,
              lineHeight: 24,
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
              }
            }
          },
          yAxis: {},
          series: [{
            name: 'decred（Ghash/s）',
            type: 'line',
            //数据
            data: chatdata,
//                  [
//                    {name:'2018-07-27 06:00:00', value:['2016/12/18 00:00', '0.00000000']},
//                    {name:'2016/12/18 01:00', value:['2016/12/18 01:00', '0.00000000']},
//                    {name:'2016/12/18 01:05', value:['2016/12/18 01:05', '0.00000000']},
//                    {name:'2016/12/18 01:45', value:['2016/12/18 01:45', '0.00000000']},
//                    {name:'2016/12/18 01:50', value:['2016/12/18 01:50', '0.00000000']},
//                    {name:'2016/12/18 01:55', value:['2016/12/18 01:55', '0.00000000']},
//                    {name:'2016/12/18 02:00', value:['2016/12/18 02:00', '0.00000000']},
//                    {name:'2016/12/18 03:00', value:['2016/12/18 03:00', '0.00000000']},
//                    {name:'2016/12/18 04:00', value:['2016/12/18 04:00', '0.00000000']},
//                    {name:'2016/12/18 05:00', value:['2016/12/18 05:00', '0.00000000']},
//
//                ],
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
      clickTab(val) {
        this.activeTab = val;
      },
      handleMinerListCurrentChange(val) {
        this.minerListCurrentPage = val;
        //请求接口
      },
      handlePaymentListCurrentChange(val) {
        this.paymentListCurrentPage = val;
        //请求接口
      },
      reSetStr(str) {
        let _str = str + '';
        if(_str.length == 1) {
          return '0' + _str;
        } else {
          return _str;
        }
      },
      httpPost(addresses) {
        this.$http.post(
          "https://web.2100pool.com/tokenbank/pow/dcr/get_income",
          {address:addresses},
          {emulateJSON: true}
        ).then(response => {
          this.notPaidReward = response.body.data.notPaidReward;
          this.selectTotalPaied = response.body.data.selectTotalPaied;
          this.totalOneHour = response.body.data.totalOneHour;
          this.totalReard = response.body.data.totalReard;
          this.totalTwentyfour = response.body.data.totalTwentyfour;
          this.username = response.body.data.username;
          this.workerAccount = response.body.data.workerAccount;
          this.workeringAccount = response.body.data.workeringAccount;
          this.yesterdayTwentyfour = response.body.data.yesterdayTwentyfour;
          this.minerList = response.body.data.minerList;
          this.chartData = response.body.data.chatdata;
          this.drawLine(this.chartData);
        }).catch((res) => {

        })
      }

    },
    mounted() {

      this.addresses=this.$route.query.address;
      this.httpPost(this.addresses);

    }
  }
</script>
