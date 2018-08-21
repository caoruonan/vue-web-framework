<template>
  <Row>
    <Col span="24">
    <Row>
      <Col span="12" style="padding-right: 5px;">
      <Card>
        <v-bar></v-bar>
      </Card>
      </Col>
      <Col span="12" style="padding-left: 5px;">
      <Card>
        <v-line></v-line>
      </Card>
      </Col>
    </Row>
    <Card class="echartStyle">
      <Row>
        <Col span="24">
        <multi-bar></multi-bar>
        </Col>
      </Row>
    </Card>
    <Card class="echartStyle">
      <Row>
        <Col span="24">
        <v-pie></v-pie>
        </Col>
      </Row>
    </Card>
    <Row class="echartStyle">
      <Col span="24">
      <Card>
        <v-map></v-map>
      </Card>
      </Col>
    </Row>
    </Col>
  </Row>
</template>
<script>
import VMap from '@/views/example/echart/echart/map'
import VBar from '@/views/example/echart/echart/bar'
import MultiBar from '@/views/example/echart/echart/multi-bar'
import VLine from '@/views/example/echart/echart/line'
import VPie from '@/views/example/echart/echart/pie'
export default {
  components: {
    'v-pie': VPie,
    'v-line': VLine,
    'multi-bar': MultiBar,
    'v-map': VMap,
    'v-bar': VBar
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style>
  .echartStyle {
    margin-top: 10px;
  }
</style>
