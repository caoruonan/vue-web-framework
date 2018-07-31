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
                <Icon type="ios-settings-strong"></Icon>
                <small>设置</small>
              </a>
              <a href="#">
                <Icon type="person"></Icon>
                <small>配置文件</small>
              </a>
              <a href="#">
                <Icon type="power"></Icon>
                <small>注销</small>
              </a>
            </div>
          </div>
          <img src="./../../assets/img/avatar-bg.png" alt="User Image" class="bg-user">
        </div>
        <ul class="sidebar-menu" data-widget="tree">
          <li v-for="(item,index) in menuList" :key="index" :data-id="item.name" class="treeview">
            <router-link v-if="item.children.length <= 1" :to="item.path + '/' + item.children[0].path">
              <i :class="[item.children[0].icon || item.icon]"></i>
              <span>{{ item.name }}</span>
              <!--<span class="pull-right-container"></span>-->
            </router-link>
            <a v-if="item.children.length > 1" href="#">
              <i :class="[item.icon]"></i>
              <span>{{ item.name }}</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul v-if="item.children.length > 1" class="treeview-menu">
              <li v-for="(subItem, subIndex) in item.children" :key="item.name + subIndex" :class="{active: subItem.name == currentName}">
                <router-link :to="item.path + '/' + subItem.path">
                  <i :class="[subItem.icon]"></i>
                  <span>{{ subItem.name }}</span>
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
      currentName: this.$route.name,
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
      this.currentName = this.$route.name
      $('.active').removeClass('active')
      $('.treeview[data-id=' + this.currentParentName + ']').addClass('active')
    }
  },
  mounted: function () {
    $('.treeview[data-id=' + this.currentParentName + ']').addClass('active')
    $(document).ready(function ($) {
      /* $('.main-sidebar > div').slimScroll({
        width: '230px',
        position: 'left',
        size: '5px',
        height: '95vh'
      }) */
    })
  }
}
</script>
