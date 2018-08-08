<template>
  <Row>
    <Col span="24">
    <Card>
      <div style="margin: 10px">
        显示边框 <i-switch v-model="showBorder" style="margin-right: 5px"></i-switch>
        显示斑马纹 <i-switch v-model="showStripe" style="margin-right: 5px"></i-switch>
        显示索引 <i-switch v-model="showIndex" style="margin-right: 5px"></i-switch>
        显示多选框 <i-switch v-model="showCheckbox" style="margin-right: 5px"></i-switch>
        显示表头 <i-switch v-model="showHeader" style="margin-right: 5px"></i-switch>
        表格滚动  <i-switch v-model="fixedHeader" style="margin-right: 5px"></i-switch>
        <br>
        <br>
        表格尺寸
        <Radio-group v-model="tableSize" type="button">
          <Radio label="large">大</Radio>
          <Radio label="default">中</Radio>
          <Radio label="small">小</Radio>
        </Radio-group>
      </div>
      <v-table :rows="rows" :columns="columns"
               :show-border="showBorder" :show-stripe="showStripe"
               :show-header="showHeader" :fixed-header="fixedHeader"
               :table-size="tableSize"></v-table>
    </Card>
    </Col>
  </Row>

</template>

<script>
import VTable from '@/views/table/Table.vue'

export default {
  components: {
    'v-table': VTable
  },
  data () {
    return {
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      fixedHeader: false,
      tableSize: 'default',
      rows: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '用户信息',
        content: '123'
      })
    },
    remove (index) {
      this.rows.splice(index, 1)
    }
  },
  computed: {
    columns () {
      let columns = []
      if (this.showCheckbox) {
        columns.push({
          type: 'selection',
          width: 60,
          align: 'center'
        })
      }
      if (this.showIndex) {
        columns.push({
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        })
      }
      columns.push({
        title: '日期',
        key: 'date',
        sortable: true
      })
      columns.push({
        title: '姓名',
        key: 'name'
      })
      columns.push({
        title: '年龄',
        key: 'age',
        sortable: true,
        filters: [
          {
            label: 'Greater than 25',
            value: 1
          },
          {
            label: 'Less than 25',
            value: 2
          }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
          if (value === 1) {
            return row.age > 25
          } else if (value === 2) {
            return row.age < 25
          }
        }
      })
      columns.push({
        title: '地址',
        key: 'address',
        filters: [
          {
            label: 'New York',
            value: 'New York'
          },
          {
            label: 'London',
            value: 'London'
          },
          {
            label: 'Sydney',
            value: 'Sydney'
          }
        ],
        filterMethod (value, row) {
          return row.address.indexOf(value) > -1
        }
      })
      columns.push({
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.show(params.index)
                }
              }
            }, 'View'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.remove(params.index)
                }
              }
            }, 'Delete')
          ])
        }
      })
      return columns
    }
  }
}
</script>
