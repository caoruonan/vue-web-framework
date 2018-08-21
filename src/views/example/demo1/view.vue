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
                        <Input v-model="model.name" disabled placeholder="请输入名称"></Input>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="邮箱：">
                        <Input v-model="model.mail" disabled placeholder="请输入邮箱"></Input>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="12">
                      <FormItem label="城市：">
                        <Select v-model="model.city" disabled placeholder="请选择城市">
                          <Option value="beijing">纽约</Option>
                          <Option value="shanghai">伦敦</Option>
                          <Option value="shenzhen">悉尼</Option>
                        </Select>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="日期：">
                        <Row>
                          <Col span="11">
                          <FormItem>
                            <DatePicker type="date" disabled placeholder="请选择日期" v-model="model.date"></DatePicker>
                          </FormItem>
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                          <FormItem>
                            <TimePicker type="time" disabled placeholder="请选择时间" v-model="model.time"></TimePicker>
                          </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="12">
                      <FormItem label="爱好：">
                        <CheckboxGroup v-model="model.interest">
                          <Checkbox disabled label="美食"></Checkbox>
                          <Checkbox disabled label="睡觉"></Checkbox>
                          <Checkbox disabled label="跑步"></Checkbox>
                          <Checkbox disabled label="电影"></Checkbox>
                        </CheckboxGroup>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="性别：">
                        <RadioGroup v-model="model.gender">
                          <Radio disabled label="male">男</Radio>
                          <Radio disabled label="female">女</Radio>
                        </RadioGroup>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="24">
                      <FormItem label="描述：">
                        <Input v-model="model.desc" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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
  }
}
</script>
