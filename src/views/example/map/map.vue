<template>
  <Row>
    <Col span="24">
    <Card>
      <div id="bMap" style="height: 600px;width: 100%"></div>
    </Card>
    </Col>
  </Row>
</template>
<script>
import BMap from 'BMap'

export default {
  data () {
    return {
    }
  },
  mounted () {
    this.ready()
  },
  methods: {
    ready: function () {
      let map = new BMap.Map('bMap')
      let point = new BMap.Point(121.518831, 38.851983)
      map.centerAndZoom(point, 14)
      map.addControl(new BMap.MapTypeControl())
      map.enableScrollWheelZoom(true)
      map.enableDoubleClickZoom(true)
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)
    }
  }
}
</script>
