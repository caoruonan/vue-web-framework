<template>
  <Row>
    <Col span="24">
      <Card>
        <div class="search-con search-con-top">
          <Button type="primary" @click="back">返回</Button>
        </div>

        <Row>
          <Col span="24">
            <Card dis-hover>
              <p slot="title"><Icon type="md-create"/> 基本信息</p>

              <Row>
                <Col span="21" offset="1">
                  <Form ref="model" :model="model" :label-width="80">
                    <Row>
                      <Col span="12">
                      <FormItem label="名称：">
                        <label class="ivu-form-item-label">{{model.name}}</label>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="邮箱：">
                        <label class="ivu-form-item-label">{{model.mail}}</label>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="12">
                      <FormItem label="城市：">
                        <label class="ivu-form-item-label">{{model.city | cityFilter}}</label>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="日期：">
                        <Row>
                          <Col span="5">
                          <FormItem>
                            <label class="ivu-form-item-label">{{parseTime(model.date, '{y}-{m}-{d}')}}</label>
                          </FormItem>
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                          <FormItem>
                            <label class="ivu-form-item-label" style="padding-left: 12px;">{{model.time}}</label>
                          </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="12">
                      <FormItem label="爱好：">
                        <label class="ivu-form-item-label">{{model.interest.toString()}}</label>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="性别：">
                        <label class="ivu-form-item-label">{{model.gender | genderFilter}}</label>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="24">
                      <FormItem label="描述：">
                        <label class="ivu-form-item-label">{{model.desc}}</label>
                      </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
</template>
<script>
import { getDetail } from '@/libs/api'
import { parseTime } from '@/libs/tools'

export default {
  name: 'demo1View',
  data () {
    return {
      id: '',
      model: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      }
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    parseTime (time, cFormat) {
      return parseTime(time, cFormat)
    },
    getDetail () {
      getDetail(this.id).then(res => {
        if (res.status === 'success') {
          res.data.date = new Date(res.data.date)
          this.model = res.data
        } else {
          res.errors.forEach((val, idx, array) => {
            this.$Message.error('数据获取失败' + val.errmsg)
          })
        }
      })
    },
    back: function () {
      this.$router.push({name: 'demo1List'})
    }
  },
  filters: {
    genderFilter: function (value) {
      return value === 'male' ? '男' : '女'
    },
    cityFilter: function (value) {
      if (value === 'beijing') {
        return '北京'
      } else if (value === 'shanghai') {
        return '上海'
      } else {
        return '深圳'
      }
    }
  }
}
</script>
