<template>
  <div class="wrapper">
    <app-header></app-header>

    <app-sidebar :menu-list="menuList"></app-sidebar>

    <div class="content-wrapper">
      <app-content-header :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"></app-content-header>
      <section class="content">
        <router-view></router-view>
      </section>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Sidebar from './layout/Sidebar.vue'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
import ContentHeader from './layout/ContentHeader.vue'
import { getNewTagList, getNextName } from '../libs/util'
import { mapMutations } from 'vuex'

export default {
  name: 'Content',
  components: {
    'app-sidebar': Sidebar,
    'app-header': Header,
    'app-footer': Footer,
    'app-content-header': ContentHeader
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    },
    cachePage () {
      return this.$store.state.app.cachePage
    },
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    }
  },
  mounted () {
    this.setTagNavList()
    this.addTag(this.$store.state.app.homeRoute)
    this.setBreadCrumb(this.$route.matched)
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'addTag',
      'setTagNavList'
    ]),
    turnToPage (name) {
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name: name
      })
    },
    handleCloseTag (res, type, name) {
      const nextName = getNextName(this.tagNavList, name)
      this.setTagNavList(res)
      if (type === 'all') this.turnToPage('home')
      else if (this.$route.name === name) this.$router.push({ name: nextName })
    },
    handleClick (item) {
      this.turnToPage(item.name)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.setBreadCrumb(newRoute.matched)
    }
  }
}
</script>
<style lang="sass">
  @import "./../styles/main.scss"
</style>
