<template>
  <md-card class="fact-box">
    <h3>Fact Box</h3>
    <div class="body">
      <p>These are the facts</p>
      <ol>
        <li>All these facts will be useless to you</li>
        <li>Fact number one is a lie</li>
        <li>And so is fact number two</li>
        <li>The only truth is that every fact here is true except the even number ones</li>
      </ol>
    </div>
  </md-card>
</template>

<script>
export default {
  name: 'fact-box',
  props: ['title', 'content']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
@import "../assets/mixin";

.md-theme-default.md-card.fact-box {
  background: $blue;
  color: #fff;
  margin: 10px;
  padding: 0;
  text-align: left;
  width: 600px;
  max-width: 100%;

  h3 {
    background: $grey;
    margin: 0;
    padding: 10px;
  }

  .body {
    padding: 10px;
  }
}
</style>
