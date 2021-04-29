<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import LoginView from './views/LoginView.vue'
@Component({
  components: {
    LoginView,
  },
})
export default class App extends Vue {
  get cookieItems() {
    const cookieMap: any = {}
    const cookieArray = document.cookie?.split('; ') || []
    cookieArray.forEach((item: string) => {
      let cookie = item.split('=')
      cookieMap[cookie[0]] = cookie[1]
    })
    return cookieMap
  }

  created() {
    if (!this.cookieItems['isLogin']) {
      this.$router.push('/Login')
    } else {
      this.$router.push('/')
      this.$store.commit('LOGIN', {
        username: this.cookieItems['isLogin']
      })
    }
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  background-color: #f2f2f2;
}
</style>

<style lang="scss" scoped>
#app {
}
</style>
