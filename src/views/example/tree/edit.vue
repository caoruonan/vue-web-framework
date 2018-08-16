<template>
  <Row>
    <Col span="24">
    <Card>
      <div style="padding-bottom: 18px">
        <Row>
          <Col span="24">
          <Button type="primary" @click="back()">返回</Button>
          <Button type="primary" @click="submit()">提交</Button>
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
              <Col span="8">
              <Input class="inputStyle" v-model="model.name" placeholder="请输入姓名"/>
              </Col>
            </Row>
            <Row class="rowStyle">
              <Col span="6" class="labelStyle">
              <span>年龄：</span>
              </Col>
              <Col span="8">
              <Input class="inputStyle" v-model="model.age" placeholder="请输入年龄"/>
              </Col>
            </Row>
            <Row class="rowStyle">
              <Col span="6" class="labelStyle">
              <span>地址：</span>
              </Col>
              <Col span="8">
              <Input class="inputStyle" v-model="model.address" placeholder="请输入地址"/>
              </Col>
            </Row>
            <Row class="rowStyle">
              <Col span="6" class="labelStyle">
              <span>时间：</span>
              </Col>
              <Col span="8">
              <Input class="inputStyle" v-model="model.date" placeholder="请输入时间"/>
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
      if (this.id) {
        getTreeTableDetail(this.id).then(function (res) {
          let data = res.data
          // console.log(data)
          that.model = data.data
        })
      }
    },
    // 提交
    submit () {
      this.$router.push('/tree/treeDemo/list')
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
  .inputStyle .ivu-input {
    height: 34px;
    font-size: 14px;
    color: #555;
  }
</style>
