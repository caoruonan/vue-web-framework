<template>
  <div style="height: 400px;width: 100%" ref="multiBarEchart"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'MultiBar',
  data () {
    return {
      multiBarChartData: {}
    }
  },
  mounted () {
    this.getMultiBarChartData()
  },
  methods: {
    // 查echarts配置项：http://echarts.baidu.com/option.html#title
    // 柱状图-多
    initMultiBarChart (data) {
      let chart = echarts.init(this.$refs.multiBarEchart)
      // 把配置和数据放这里
      chart.setOption({
        title: {
          text: '世界人口总量',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: data.data1
          },
          {
            name: '2012年',
            type: 'bar',
            data: data.data2
          }
        ]
      })
    },
    getMultiBarChartData () {
      let that = this
      that.multiBarChartData.data1 = [18203, 23489, 29034, 104970, 131744, 630230]
      that.multiBarChartData.data2 = [19325, 23438, 31000, 121594, 134141, 681807]
      that.initMultiBarChart(that.multiBarChartData)
    }
  }
}
</script>
