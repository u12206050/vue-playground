<template>
  <md-toolbar class="header">
    <router-link to="/" class="logo"><img src="../assets/logo.png"></router-link>
    <md-layout md-align="end">
      <input-box placeholder="Søk" icon="search" v-on:onChange="search"></input-box>
      <button class="menu_button" v-on:click="openMenu()"><md-icon>menu</md-icon><span>Meny</span></button>
    </md-layout>
  </md-toolbar>
</template>

<script>
export default {
  name: 'app-header',
  methods: {
    openMenu () {
      this.$store.commit('sideMenu/toggleMenu', true)
    },
    search (_query) {
      this.$router.push({name: 'Search', params: {query: _query}})
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
  padding: 20px 40px;

  img {
    height: 30px;
  }

  .search {
    width: 250px;
    padding: 4px 0;
  }

  .menu_button {
    span {
      font-size: 20px;
      font-weight: 400;
      padding: 2px;
      margin: 0 10px;
      border-bottom: 1px solid #000;
    }

    i {
      display: none;
    }

    @media all and (max-width:768px) {
      span {
        display: none;
      }
      i {
        display: block;
      }
    }
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
