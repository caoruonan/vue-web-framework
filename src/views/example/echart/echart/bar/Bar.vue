<template>
  <div style="height: 300px;width: 100%" ref="barEchart"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'VBar',
  data () {
    return {
      barChartData: []
    }
  },
  mounted () {
    this.getBarChartData()
  },
  methods: {
    // 查echarts配置项：http://echarts.baidu.com/option.html#title
    // 柱状图-单
    initBarChart (data) {
      let chart = echarts.init(this.$refs.barEchart)
      // 把配置和数据放这里
      chart.setOption({
        title: {
          text: '柱状图'
        },
        color: ['#3398DB'], // 不写时 默认颜色 '#c23531'
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar', // 'line' 则为折线图
            barWidth: '50%',
            data: data
          }
        ]
      })
    },
    getBarChartData () {
      let that = this
      that.barChartData = [10, 52, 200, 334, 390, 330, 220]
      that.initBarChart(that.barChartData)
    }
  }
}
</script>
