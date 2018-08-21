<template>
  <Row>
    <Col span="24">
    <Card>
      <div style="padding-bottom: 18px">
        <Row>
          <Col span="24">
          <Button type="primary" @click="back()">返回</Button>
          <Button type="primary" @click="edit()">编辑</Button>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span="24">
        <Card dis-hover class="cardStyle">
          <p slot="title">
            <Icon type="ios-contact" size="24"/>
            <span>基本信息</span>
          </p>
          <div class="cardFormBody">
            <Row class="rowStyle">
              <Col span="6" class="labelStyle">
              <span>姓名：</span>
              </Col>
              <Col span="18" class="labelStyle newLine">
              <span v-text="model.name"></span>
              </Col>
            </Row>
            <Row class="rowStyle">
              <Col span="6" class="labelStyle">
              <span>邮箱：</span>
              </Col>
              <Col span="18" class="labelStyle newLine">
              <span v-text="model.mail"></span>
              </Col>
            </Row>
            <Row class="rowStyle">
              <Col span="6" class="labelStyle">
              <span>地址：</span>
              </Col>
              <Col span="18" class="labelStyle newLine">
              <span v-text="model.city"></span>
              </Col>
            </Row>
            <Row class="rowStyle">
              <Col span="6" class="labelStyle">
              <span>时间：</span>
              </Col>
              <Col span="18" class="labelStyle newLine">
              <span v-text="model.date"></span>
              </Col>
            </Row>
          </div>
        </Card>
        </Col>
      </Row>
    </Card>
    </Col>
  </Row>
</template>
<script>
import { getTreeTableDetail } from '@/libs/api'
export default {
  data () {
    return {
      id: this.$route.params.id,
      model: {}
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      let that = this
      getTreeTableDetail(that.id).then(function (res) {
        let data = res.data
        // console.log(data)
        that.model = data
      })
    },
    // 编辑
    edit () {
      this.$router.push({name: 'treeDemoEdit', params: {id: this.id}})
    },
    // 返回
    back () {
      this.$router.push('/tree/treeDemo/list')
    }
  }
}
</script>
<style>
  .cardStyle .ivu-card-head {
    padding: 11px 16px;
    line-height: 0;
  }
  .cardStyle .ivu-card-head p span {
    font-size: 18px;
  }
  .cardStyle .ivu-card-body {
    padding: 20px;
  }
  .rowStyle {
    margin-bottom: 15px;
  }
  .labelStyle {
    text-align: right;
    padding-right: 40px;
    padding-top: 6px;
    color: #34495e;
    font-size: 14px;
  }
  .labelStyle.newLine {
    text-align: left;
  }
</style>
