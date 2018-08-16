<template>
  <Row>
    <Col span="24">
      <Card>
        <div class="search-con search-con-top">
          <Button @click="add" type="primary">新建</Button>
          <div class="search-right-box">
            <Select v-model="condition.searchKey"  style="width:200px" clearable>
              <Option v-for="item in columns" v-if="item.key && item.key !== 'handle'" :value="item.key" :key="'search-'+ item.key">{{ item.title }}</Option>
            </Select>
            <Input  style="width:200px" clearable placeholder="输入关键字搜索" v-model="condition.searchValue"/>
            <Button @click="list" type="primary">查询</Button>
          </div>
        </div>

        <v-table ref="testTable"
                 :rows="rows"
                 :columns="columns"
                 :pageable="pageable"
                 @page-num-change="pageNumChange"
                 @page-size-change="pageSizeChange"
                 @on-view="view"
                 @on-edit="edit"
                 @on-delete="remove"
        ></v-table>
      </Card>
    </Col>
  </Row>
</template>
<script>
import VTable from '@/components/table'
import { getListData } from '@/libs/api'

export default {
  name: 'demo1List',
  components: {
    'v-table': VTable
  },
  data () {
    return {
      condition: {},
      rows: [],
      pageable: {}
    }
  },
  computed: {
    columns () {
      let columns = []
      columns.push({title: '序号', type: 'index', width: 60, align: 'center'})
      columns.push({title: '日期', key: 'date', sortable: true})
      columns.push({title: '姓名', key: 'name'})
      columns.push({title: '年龄', key: 'age'})
      columns.push({title: '地址', key: 'address', tooltip: true})
      columns.push({title: '操作', key: 'handle', align: 'center', options: ['view', 'edit', 'delete']})
      return columns
    }
  },
  mounted () {
    this.gotoFirstPage()
  },
  methods: {
    add: function () {
      this.$router.push({name: 'demo1Create'})
    },
    view (params) {
      this.$router.push({name: 'demo1View', params: { id: params.row.id }})
    },
    edit (params) {
      this.$router.push({name: 'demo1Edit', params: { id: params.row.id }})
    },
    remove (params) {
      this.rows.splice(params.index, 1)
    },
    pageNumChange (number) {
      this.$refs.testTable.setStoredPage(number)
      this.list()
    },
    pageSizeChange (size) {
      this.$refs.testTable.setSize(size)
      this.gotoFirstPage()
    },
    gotoFirstPage () {
      this.$refs.testTable.setStoredPage(0)
      this.list()
      this.$refs.testTable.clearSearchParams()
    },
    list () {
      let params = this.$refs.testTable.putSearchParams({
        searchKey: this.condition.searchKey,
        searchValue: this.condition.searchValue
      })
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
    }
  }
}
</script>
