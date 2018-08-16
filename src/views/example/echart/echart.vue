<template>
  <Row>
    <Col span="24">
    <Row>
      <Col span="12" style="padding-right: 5px;">
      <Card>
        <div id="barChart" style="height: 300px;width: 500px"></div>
      </Card>
      </Col>
      <Col span="12" style="padding-left: 5px;">
      <Card>
        <div id="lineChart" style="height: 300px;width: 500px"></div>
      </Card>
      </Col>
    </Row>
    <Card style="margin-top: 10px;">
      <div style="margin: 10px">
        <Row>
          <Col span="24">
          <div id="multiBarChart" style="height: 400px;width: 100%"></div>
          </Col>
        </Row>
      </div>
    </Card>
    <Card style="margin-top: 10px;">
      <div style="margin: 10px">
        <Row>
          <Col span="24">
          <div id="multiLineChart" style="height: 400px;width: 100%"></div>
          </Col>
        </Row>
      </div>
    </Card>
    <Card style="margin-top: 10px;">
      <div style="margin: 10px">
        <Row>
          <Col span="24">
          <div id="pieChart" style="height: 400px;width: 100%"></div>
          </Col>
        </Row>
      </div>
    </Card>
    <Row style="margin-top: 10px;">
      <Col span="24">
      <Card>
        <div id="MapChart" style="height: 600px;width: 100%"></div>
      </Card>
      </Col>
    </Row>
    </Col>
  </Row>
</template>
<script>
import echarts from 'echarts'
import { getHebeiData } from '@/libs/api'
export default {
  data () {
    return {
      barChartData: [],
      multiBarChartData: {},
      data: {}
    }
  },
  mounted () {
    this.getBarChartData()
    this.getMultiBarChartData()
    this.initMultiLineChart()
    this.initLineChart()
    this.initPieChart()
    this.getMapChartData()
  },
  methods: {
    // 查echarts配置项：http://echarts.baidu.com/option.html#title
    // 柱状图-单
    initBarChart (data) {
      let chart = echarts.init(document.getElementById('barChart'))
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
    },
    // 柱状图-多
    initMultiBarChart (data) {
      let chart = echarts.init(document.getElementById('multiBarChart'))
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
    },
    // 折线图-单
    initLineChart () {
      let chart = echarts.init(document.getElementById('lineChart'))
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
    },
    // 折线图-多
    initMultiLineChart () {
      let chart = echarts.init(document.getElementById('multiLineChart'))
      chart.setOption({
        title: {
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: { // 工具
          feature: {
            saveAsImage: {} // 将echart图保存为图片
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
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      })
    },
    // 饼状图
    initPieChart () {
      let chart = echarts.init(document.getElementById('pieChart'))
      chart.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    // echarts绘制地图
    initMapChart (geoJson) {
      let chart = echarts.init(document.getElementById('MapChart'))
      echarts.registerMap('hebei', geoJson)
      let getColor = function (flag) {
        if (flag) {
          var value = parseInt(flag)
          if (value < 50) {
            return '#2ECD2F'
          } else if (value < 100) {
            return '#F0E914'
          } else if (value < 150) {
            return '#E88019'
          } else if (value < 200) {
            return '#E02D1C'
          } else if (value < 300) {
            return '#AF32BA'
          } else {
            return '#950A32'
          }
        } else {
          return 'grey'
        }
      }
      let geoCoordMap = {
        '承德市': [117.5757, 41.4075],
        '张家口市': [115.1477, 40.8527],
        '衡水市': [115.8838, 37.7161],
        '邯郸市': [114.4775, 36.535],
        '沧州市': [116.8286, 38.2104],
        '邢台市': [114.8071, 37.2821],
        '秦皇岛市': [119.2126, 40.0232],
        '石家庄市': [114.4995, 38.1006],
        '保定市': [115.0488, 39.0948],
        '廊坊市': [116.521, 39.0509],
        '唐山市': [118.4766, 39.6826]
      }
      let data = [
        {'name': '承德市', value: 25},
        {'name': '张家口市', value: 40},
        {'name': '衡水市', value: 130},
        {'name': '邯郸市', value: 30},
        {'name': '沧州市', value: 90},
        {'name': '邢台市', value: 192},
        {'name': '秦皇岛市', value: 128},
        {'name': '石家庄市', value: 300},
        {'name': '保定市', value: 220},
        {'name': '廊坊市', value: 100},
        {'name': '唐山市', value: 200}
      ]
      let max = 480
      let min = 9
      let maxSize4Pin = 100
      let minSize4Pin = 20

      let convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }
      chart.setOption({
        backgroundColor: '#263546',
        title: {
          text: '河北省PM2.5及河北空气质量指数(AQI)',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (typeof (params.value)[2] === 'undefined') {
              return params.name + ' : ' + params.value
            } else {
              return params.name + ' : ' + params.value[2]
            }
          }
        },
        legend: {
          show: false,
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['credit_pm2.5'],
          textStyle: {
            color: '#fff'
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ['#fff', '#fff'] // 蓝黑
          }
        },
        geo: {
          show: true,
          map: 'hebei',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#ffffff',
              borderColor: '#263546'
            },
            emphasis: {
              areaColor: '#ffffff'
            }
          }
        },
        series: [{
          name: 'credit_pm2.5',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(data),
          symbolSize: function (val) {
            return val[2] / 10
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                return getColor(params.data.value[2])
              }
            }
          }
        },
        {
          type: 'map',
          map: 'hebei',
          geoIndex: 0,
          aspectScale: 0.75, // 长宽比
          showLegendSymbol: false, // 存在legend时显示
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: data
        },
        {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: function (val) {
            var a = (maxSize4Pin - minSize4Pin) / (max - min)
            var b = minSize4Pin - a * min
            b = maxSize4Pin - a * max
            return a * val[2] + b
          },
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return params.data.value[2]
              },
              textStyle: {
                color: '#fff',
                fontSize: 9
              }
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                return getColor(params.data.value[2])
              }
            }
          },
          zlevel: 6,
          data: convertData(data)
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(data.sort(function (a, b) {
            return b.value - a.value
          }).slice(0, 5)),
          symbolSize: function (val) {
            return val[2] / 10
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                return getColor(params.data.value[2])
              },
              shadowBlur: 10,
              shadowColor: function (params) {
                return getColor(params.data.value[2])
              }
            }
          },
          zlevel: 1
        }]
      })
    },
    getMapChartData () {
      let that = this
      getHebeiData().then(function (res) {
        let data = res.data
        console.log(data)
        that.initMapChart(data)
      })
    }
  }
}
</script>
