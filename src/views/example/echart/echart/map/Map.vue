<template>
  <div style="height: 600px;width: 100%" ref="mapEchart"></div>
</template>
<script>
import echarts from 'echarts'
import { getHebeiData } from '@/libs/api'

export default {
  name: 'VMap',
  data () {
    return {
    }
  },
  mounted () {
    this.getMapChartData()
  },
  methods: {
    // 查echarts配置项：http://echarts.baidu.com/option.html#title
    // echarts绘制地图
    initMapChart (geoJson) {
      let chart = echarts.init(this.$refs.mapEchart)
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
        let data = res
        // console.log(data)
        that.initMapChart(data)
      })
    }
  }
}
</script>
