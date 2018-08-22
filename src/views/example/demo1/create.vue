<template>
  <Row>
    <Col span="24">
      <Card>
        <div class="search-con search-con-top">
          <Button type="primary" @click="back">返回</Button>
          <Button type="primary" @click="handleSubmit('model')">提交</Button>
          <Button type="primary" @click="handleReset('model')">重置</Button>
        </div>

        <Row>
          <Col span="24">
            <Card dis-hover>
              <p slot="title"><Icon type="md-create"/> 基本信息</p>

              <Row>
                <Col span="21" offset="1">
                  <Form ref="model" :model="model" :rules="ruleValidate" :label-width="80">
                    <Row>
                      <Col span="12">
                      <FormItem label="Text" prop="name">
                        <Input v-model="model.name" placeholder="请输入名称"></Input>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="邮箱" prop="mail">
                        <Input v-model="model.mail" placeholder="请输入邮箱"></Input>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="12">
                      <FormItem label="城市" prop="city">
                        <Select v-model="model.city" placeholder="请选择城市">
                          <Option value="beijing">北京</Option>
                          <Option value="shanghai">上海</Option>
                          <Option value="shenzhen">深圳</Option>
                        </Select>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="日期">
                        <Row>
                          <Col span="11">
                          <FormItem prop="date">
                            <DatePicker type="date" placeholder="请选择日期" v-model="model.date"></DatePicker>
                          </FormItem>
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                          <FormItem prop="time">
                            <TimePicker type="time" placeholder="请选择时间" v-model="model.time"></TimePicker>
                          </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="12">
                      <FormItem label="爱好" prop="interest">
                        <CheckboxGroup v-model="model.interest">
                          <Checkbox label="美食"></Checkbox>
                          <Checkbox label="睡觉"></Checkbox>
                          <Checkbox label="跑步"></Checkbox>
                          <Checkbox label="电影"></Checkbox>
                        </CheckboxGroup>
                      </FormItem>
                      </Col>
                      <Col span="12">
                      <FormItem label="性别" prop="gender">
                        <RadioGroup v-model="model.gender">
                          <Radio label="male">男</Radio>
                          <Radio label="female">女</Radio>
                        </RadioGroup>
                      </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col span="24">
                      <FormItem label="描述">
                        <Input v-model="model.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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
import { getDetail, saveData } from '@/libs/api'

export default {
  name: 'demo1Create',
  data () {
    return {
      id: '',
      copy_model: {},
      model: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'change' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'change' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'change' }
        ],
        city: [
          { required: true, message: '城市不能为空', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '性别不能为空', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: '爱好不能为空', trigger: 'change' },
          { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: '日期不能为空', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: '时间不能为空', trigger: 'change' }
        ]
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
          Object.assign(this.copy_model, this.model)
        } else {
          res.errors.forEach((val, idx, array) => {
            this.$Message.error('数据获取失败' + val.errmsg)
          })
        }
      })
    },
    back: function () {
      this.$router.push({name: 'demo1List'})
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          saveData(this.model).then(res => {
            if (res.status === 'success') {
              this.$Message.success('保存成功')
              this.$router.push({name: 'demo1List'})
            } else {
              res.errors.forEach((val, idx, array) => {
                this.$Message.error('保存失败' + val.errmsg)
              })
            }
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      Object.assign(this.model, this.copy_model)
    }
  }
}
</script>
