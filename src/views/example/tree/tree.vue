<template>
  <Row>
    <Col span="24">
    <Card>
      <Row>
        <Col span="7" style="padding-right: 10px;">
        <Card dis-hover class="treeCardStyle">
          <p slot="title">
            <Icon type="ios-people" size="24"/>
            <span>组织机构</span>
          </p>
          <Tree :data="treeData" :render="renderContent"></Tree>
        </Card>
        </Col>
        <Col span="17">
        <div class="listTool-Header">
          <Row>
            <Col span="12">
            <Button type="primary" @click="create()">新建</Button>
            </Col>
            <Col span="12">
            <Input class="searchInputStyle" search enter-button="查询" placeholder="请输入"/>
            </Col>
          </Row>
        </div>
        <!--table-->
        <Table :columns="columns1" :data="tableSelectData"></Table>
        <div style="margin: 10px;">
          <Row>
            <Col span="24">
            <Page :total="100" :current="1" show-total show-sizer :page-size="10" style="float: right;"></Page>
            </Col>
          </Row>
        </div>
        </Col>
      </Row>
    </Card>
    </Col>
    <!--组织机构模态框-->
    <Modal
      v-model="organizationModal"
      title="组织机构"
      @on-ok="ok"
      @on-cancel="cancel">
      <div style="padding-left: 25px;">
        <Tree :data="treeData" :render="renderContent" show-checkbox multiple></Tree>
      </div>
    </Modal>
  </Row>
</template>
<script>
import { getOrganization, getTreeTableList } from '@/libs/api'
export default {
  data () {
    return {
      organizationModal: false,
      treeData: [],
      columns1: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Action',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // console.log(params)
                    this.view(params.row, params.index)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // console.log(params)
                    this.organization(params.index)
                  }
                }
              }, '组织'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: [],
      tableSelectData: []
    }
  },
  mounted () {
    this.getTableData()
    this.getOrganizationData()
  },
  methods: {
    // 获取左侧树数据
    getOrganizationData () {
      let that = this
      getOrganization().then(function (res) {
        let data = res.data
        // console.log(res)
        that.treeData = data.data
      })
    },
    // 自定义左侧树 图标
    renderContent (h, { root, node, data }) {
      return h('span', [
        h('span', [
          h('Icon', {
            props: {
              type: this.getValue(data).icon,
              size: 18,
              color: '#2d8cf0'
            },
            style: {
              marginRight: '5px'
            }
          }),
          h('Button', {
            style: {
              marginTop: '1px',
              padding: '2px 2px 1px'
            },
            props: Object.assign({}, this.buttonProps, {
              type: 'text',
              size: 'small'
            }),
            on: {
              click: () => {
                this.getTableData(data.id)
              }
            }
          }, data.name)
        ])
      ])
    },
    getValue (data) {
      var value = {}
      if (data.user) {
        value.icon = 'md-person'
        value.disabledFlag = true
      } else {
        value.icon = 'md-folder'
        value.disabledFlag = false
      }
      return value
    },
    // 点击左侧树 -> table数据变化
    getTableData (id) {
      let that = this
      getTreeTableList().then(function (res) {
        let data = res.data
        // console.log(data)
        that.tableData = data.data
        that.tableSelectData = that.tableData
        if (id === '5' && id !== undefined) {
          that.tableSelectData = [
            {
              id: 5,
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
            }
          ]
        } else {
          that.tableSelectData = that.tableData
        }
      })
    },
    // 组织
    organization (index) {
      this.organizationModal = true
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    // 删除
    delete (row) {
      this.tableSelectData.splice(this.tableSelectData.indexOf(row), 1)
    },
    // 查看详情
    view (row, index) {
      // this.$router.push('/tree/treeDemo/view')
      this.$router.push({name: 'treeDemoView', params: {id: row.id}})
    },
    // 新建
    create () {
      this.$router.push({name: 'treeDemoCreate'})
    }
  }
}
</script>
<style>
  .treeCardStyle .ivu-card-head {
    padding: 11px 16px;
    line-height: 0;
  }
  .treeCardStyle .ivu-card-head p span {
    font-size: 18px;
  }
  .treeCardStyle .ivu-card-body {
    padding: 5px 20px;
  }
  .listTool-Header {
    padding-bottom: 11px;
  }
  .searchInputStyle {
    width: 200px;
    float: right;
  }
</style>
