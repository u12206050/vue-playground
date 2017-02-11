<template>
  <md-toolbar class="header">
    <router-link to="/" class="logo"><img src="../assets/logo.png"></router-link>
    <md-layout md-align="end">
      <input-box placeholder="Søk" icon="search" v-on:onChange="search"></input-box>
      <button v-on:click="openMenu()"><md-icon>menu</md-icon></button>
    </md-layout>
  </md-toolbar>
</template>

<script>
import InputBox from 'components/InputBox'

export default {
  name: 'app-header',
  components: {
    'input-box': InputBox
  },
  methods: {
    openMenu () {
      window.eventBus.$emit('side-menu', 1)
    },
    search (_query) {
      window.rootRouter.push({name: 'Search', params: {query: _query}})
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";

.md-theme-default.md-toolbar.header {
  z-index: 3;
  background-color: #fff;
  color: #333;
  width: 100%;
  text-align: right;
  margin-bottom: 60px;
  box-shadow: 0px 2px 2px #505050;

  img {
    height: 30px;
  }

  .search {
    width: 250px;
  }

  a:not(.logo) {
    padding: 10px;
    display: inline-block;
    text-decoration: none;
    color: #2c3e50;

    &.router-link-active {
      background: #2c3e50;
      color: #ddd;
    }
  }

  @media all and (max-width:600px) {
    padding: 10px;

    .search {
      width: 150px;
    }
  }
}
</style>
