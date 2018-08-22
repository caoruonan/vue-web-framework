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
        显示分页  <i-switch v-model="showPageable" style="margin-right: 5px"></i-switch>
        单选操作  <i-switch v-model="singleSelection" style="margin-right: 5px"></i-switch>
        <br>
        <br>
        表格尺寸
        <Radio-group v-model="tableSize" type="button">
          <Radio label="large">大</Radio>
          <Radio label="default">中</Radio>
          <Radio label="small">小</Radio>
        </Radio-group>
        <Button type="primary" @click="exportExcel">导出为Csv文件</Button>
      </div>
      <v-table ref="testTable" :rows="rows" :columns="columns" :pageable="pageable"
               :show-border="showBorder" :show-stripe="showStripe"
               :show-header="showHeader" :fixed-header="fixedHeader" :show-pageable="showPageable"
               :table-size="tableSize" :single-selection="singleSelection"
               @on-selection-change="getCheckedList" @on-current-change="getCurrentRow"
               @page-num-change="pageNumChange" @page-size-change="pageSizeChange"
               @on-view="view" @on-edit="edit" @on-delete="remove"
      ></v-table>
    </Card>
    </Col>
  </Row>

</template>

<script>
import VTable from '@/components/table'
import { getListData } from '@/libs/api'
import { parseTime } from '@/libs/tools'

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
      showPageable: true,
      singleSelection: false,
      tableSize: 'default',
      checkedList: [],
      currentRow: {},
      rows: [],
      pageable: {}
    }
  },
  mounted () {
    this.gotoFirstPage()
  },
  methods: {
    gotoFirstPage () {
      this.$refs.testTable.setStoredPage(0)
      this.list()
      this.$refs.testTable.clearSearchParams()
    },
    list () {
      let params = this.$refs.testTable.putSearchParams()
      getListData(params).then(res => {
        if (res.status === 'success') {
          this.rows = res.data
          this.pageable = res.pageable
        } else {
          res.errors.forEach((val, idx, array) => {
            this.$Message.error('数据获取失败' + val.errmsg)
          })
        }
      })
    },
    view (params) {
      // todo 跳转至查看页
    },
    edit (params) {
      // todo 跳转至编辑
    },
    remove (params) {
      this.rows.splice(params.index, 1)
    },
    getCheckedList (data) {
      // 获取多选数据
      this.checkedList = data
    },
    getCurrentRow (newData, oldData) {
      // 获取单选数据
      this.currentRow = newData
    },
    pageNumChange (number) {
      this.$refs.testTable.setStoredPage(number)
      this.list()
    },
    pageSizeChange (size) {
      this.$refs.testTable.setSize(size)
      this.gotoFirstPage()
    },
    exportExcel () {
      this.$refs.testTable.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  watch: {
    'singleSelection': function (newData, oldData) {
      if (!newData) {
        this.$refs.testTable.clearCurrentRow() // 清空单选数据
      }
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
        sortable: true,
        render: function (h, params) {
          return h('div',
            parseTime(this.row.date, '{y}-{m}-{d}')
          )
        }
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
        tooltip: true,
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
        key: 'handle',
        align: 'center',
        options: ['view', 'edit', 'delete']
      })
      return columns
    }
  }
}
</script>
