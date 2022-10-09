<template>
  <div id="app">
    <Search/>
    <NavMenu/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'App',
  components: {
   Search,
   NavMenu
  }
}
</script>

<style scoped>
#app {
    height: 100%;
}
#app .top-container {
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

#app .index-container {
  height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>
