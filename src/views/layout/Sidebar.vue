<template>
  <aside class="main-sidebar">
    <div>
      <section class="sidebar">
        <div class="user-panel">
          <div class="image">
            <img src="./../../assets/img/avatar2.png" alt="User Image" class="img-circle">
          </div>
          <div class="info">
            <p>上午好, 王伟健</p>
            <div>
              <a href="#">
                <Icon type="md-options" />
                <small>设置</small>
              </a>
              <a href="#">
                <Icon type="md-person" />
                <small>配置文件</small>
              </a>
              <a href="#">
                <Icon type="ios-power" />
                <small>注销</small>
              </a>
            </div>
          </div>
          <img src="./../../assets/img/avatar-bg.png" alt="User Image" class="bg-user">
        </div>
        <ul class="sidebar-menu" data-widget="tree">
          <li v-for="(item,index) in menuList" :key="index" :data-id="item.name" class="treeview">
            <router-link v-if="item.children.length <= 1" :to="{name: item.name}">
              <i :class="[item.children[0].icon || item.icon]"></i>
              <span>{{ showTitle(item) }}</span>
            </router-link>
            <a v-if="item.children.length > 1" href="#">
              <i :class="[item.icon]"></i>
              <span>{{ showTitle(item) }}</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul v-if="item.children.length > 1" class="treeview-menu">
              <li v-for="(subItem, subIndex) in item.children" :key="item.name + subIndex" :data-id="subItem.name">
                <router-link :to="{name: subItem.name}">
                  <i :class="[subItem.icon]"></i>
                  <span>{{ showTitle(subItem) }}</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </aside>
</template>

<script>
import $ from 'jquery'
import { showTitle } from '@/libs/util'

export default {
  name: 'ContentSidebar',
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      currentName: this.$route.matched[1].name,
      currentParentName: this.$route.matched[0].name,
      currentParentClass: ''
    }
  },
  created: function () {
    $(document).ready(function ($) {
      $("[data-widget='tree']").each(function () {
        $.fn.tree.call($(this))
      })
    })
  },
  watch: {
    '$route' () {
      this.currentParentName = this.$route.matched[0].name
      this.currentName = this.$route.matched[1].name
      $('.active').removeClass('active')
      $('.treeview-menu li[data-id=' +  this.currentName + ']').addClass('active')
      $('.treeview[data-id=' + this.currentParentName + ']').addClass('active')
    }
  },
  mounted: function () {
    $('.treeview[data-id=' + this.currentParentName + ']').addClass('active')
    $('.treeview-menu li[data-id=' +  this.currentName + ']').addClass('active')
    $(document).ready(function ($) {
      /* $('.main-sidebar > div').slimScroll({
        width: '230px',
        position: 'left',
        size: '5px',
        height: '95vh'
      }) */
    })
  },
  methods: {
    showTitle (item) {
      return showTitle(item, this)
    }
  }
}
</script>
