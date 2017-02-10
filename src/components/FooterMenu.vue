<template>
  <md-theme md-name="footer-menu">
    <md-toolbar>
      <p v-for="link of links" v-if="link.url" >
        <router-link v-if="!link.external" :to="link.url" class="alink-internal">{{link.title}}</router-link>
        <a v-else-if="link.external" target="_blank" :href="link.url" class="alink-external">{{link.title}}</a>
      </p>
      <md-layout md-align="end">
        <a class="fb" v-if="facebook" v-bind:href="facebook">Følg oss på facebook <md-icon  md-src="/static/fb.svg"></md-icon></a>
      </md-layout>
    </md-toolbar>
  </md-theme>
</template>

<script>
export default {
  name: 'footer-menu',
  props: ['links', 'facebook']
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";

.md-theme-footer-menu {
  background: #fff;

  p,  a:not(.md-button) {
    display: inline-block;
    margin: 0 10px;
    color: $blue;
  }
}
</style>
