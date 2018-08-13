<template>
  <div class="v-table-content">
    <Table ref="vTable"
           :highlight-row="singleSelection"
           :border="showBorder"
           :stripe="showStripe"
           :show-header="showHeader"
           :height="fixedHeader ? 250 : ''"
           :size="tableSize"
           :data="rows"
           :columns="columns"
           @on-current-change="onCurrentChange"
           @on-select="onSelect"
           @on-select-cancel="onSelectCancel"
           @on-select-all="onSelectAll"
           @on-selection-change="onSelectionChange"
    ></Table>
    <div style="margin: 10px;overflow: hidden" v-if="showPageable">
      <div style="float: right">
        <Page :total="pageable.totalElements"
              :current="pageable.number + 1"
              show-total
              show-sizer
              :page-size="pageable.size"
              :page-size-opts="sizeOpts"
              @on-change="pageNumChange"
              @on-page-size-change="pageSizeChange"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'VTable',
  props: {
    rows: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    pageable: {
      type: Object,
      default: function () {
        return {
          'totalElements': 0,
          'numberOfElements': 0,
          'totalPages': 0,
          'first': true,
          'last': true,
          'size': 10,
          'number': 0,
          'fromNumber': 0,
          'toNumber': 0
        }
      }
    },
    sort: {
      type: String,
      default: 'id'
    },
    order: {
      type: String,
      default: 'desc',
      validator: function (value) {
        return ['desc', 'asc'].indexOf(value) !== -1
      }
    },
    sizeOpts: {
      type: Array,
      default: function () {
        return [10, 25, 50]
      }
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    showStripe: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    showPageable: {
      type: Boolean,
      default: true
    },
    singleSelection: {
      type: Boolean,
      default: false
    },
    tableSize: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['large', 'default', 'small'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      currentRow: {},
      storedPage: 0,
      pageableSize: 10,
      s_search: {}
    }
  },
  methods: {
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    clearCurrentRow () {
      this.$refs.vTable.clearCurrentRow()
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    exportCsv (params) {
      this.$refs.vTable.exportCsv(params) // 导出为Csv文件
    },
    setStoredPage (page) {
      this.storedPage = page
    },
    setSize (size) {
      this.pageableSize = size
    },
    pageNumChange (number) {
      this.$emit('page-num-change', number)
    },
    pageSizeChange (size) {
      this.$emit('page-size-change', size)
    },
    getSortAndOrder () {
      if (this.sort && this.order) {
        return this.sort + ',' + this.order
      } else {
        return ''
      }
    },
    putSearchParams (params) {
      for (let k in params) {
        if (params.hasOwnProperty(k)) {
          this.s_search[k] = params[k]
        }
      }
      let queryMap = {page: this.storedPage, size: this.pageableSize}
      if (this.s_search) {
        for (let k in this.s_search) {
          if (this.s_search.hasOwnProperty(k) && this.s_search[k] !== undefined && this.s_search[k] !== '') {
            queryMap['s_' + k] = this.s_search[k]
          }
        }
      }
      queryMap.sort = this.getSortAndOrder()
      return queryMap
    },
    clearSearchParams () {
      this.s_search = {}
    }
  }
}
</script>

<style>
  .v-table-content td .ivu-table-cell button.ivu-btn{
    margin-right: 5px
  }
</style>
