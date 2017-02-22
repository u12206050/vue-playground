<template>
  <div class="footer">
    <md-layout md-gutter class="container" md-align="center">
      <md-layout md-flex-xsmall="100" md-flex="50" class="info">
        <h3>{{footer.title}}</h3>
        <div v-html="footer.body" class="html"></div>
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex="50" class="partners">
        <a href="http://www.realfagsrekruttering.no" target="_blank">
          <img src="../assets/NSR_logo.svg" alt="Nasjonalt Senter for Realfagsrekruttering">
        </a>
        <a href="http://www.regjeringen.no/kd" target="_blank" id="kd">
          <img src="../assets/kd_hvit.svg" alt="Kunnskapsdepartementet">
        </a>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'app-footer',
  computed: {
    footer () {
      if (this.$store.state.siteSettings) {
        return this.$store.state.siteSettings.footer || {}
      }
      return {}
    }
  }
}
</script>

<style lang="scss">
@import "../assets/mixin";

.footer {
  width: 100%;
  position: relative;
  z-index: 3;
  display: block;
  background-color: $grey;
  color: #fff;
  margin-top: 60px;
  padding: 40px 100px;

  .container {
    -ms-flex-pack: space-between;
    justify-content: space-between;
    -ms-flex-align: space-between;
    max-width: 100%;
    margin: 0 auto;

    .info {
      display: block;
      text-align: left;
      h3 {
        display: block;
      }

      .html {
        display: block;

        p {
          font-size: 12px;
          margin: 2px;
        }
      }
    }

    .partners {
      margin-top: 10px;
      display: block;
      text-align: center;

      a {
        width: 100%;
        display: block;

        img {
          width: 250px;
          max-width: 100%;
          margin: 10px;
        }
      }
    }
  }
}
</style>
