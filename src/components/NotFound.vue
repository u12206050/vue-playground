<template>
  <div class="not-found">
    <h1>404 Siden finnes ikke</h1>
    <md-button @click.native="goBack()">Tilbake</md-button><br/>
    <router-link to="/" class="alink-internal">Hjem</router-link>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
@import "../assets/mixin";

.not-found {
  text-align: center;

  h1 {
    color: $blue;
  }
  a, .md-button {
    color: $red;
  }
}
</style>
