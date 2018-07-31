<template>
  <div>
    <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="rows" :columns="columns"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" show-total show-sizer :page-size="10"></Page>
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
    tableSize: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['large', 'default', 'small'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {}
  },
  computed: {}
}
</script>
