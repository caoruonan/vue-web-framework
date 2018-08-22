<template>
  <div style="height: 300px;width: 100%" ref="lineEchart"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'VLine',
  data () {
    return {
    }
  },
  mounted () {
    this.initLineChart()
  },
  methods: {
    // 查echarts配置项：http://echarts.baidu.com/option.html#title
    // 折线图-单
    initLineChart () {
      let chart = echarts.init(this.$refs.lineEchart)
      chart.setOption({
        title: {
          text: '折线图'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
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
            type: 'line',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    }
  }
}
</script>
