<template>
  <md-layout md-gutter class="container">
    <md-layout md-flex-xsmall="100" md-flex-large="100">
      <accordion></accordion>
    </md-layout>
    <md-layout md-flex-xsmall="100" md-flex-large="50">
      <base-card type="square"></base-card>
    </md-layout>
    <md-layout md-flex-xsmall="100" md-flex-large="50">
      <base-card type="square"></base-card>
    </md-layout>
    <md-layout md-flex-xsmall="100" md-flex-large="50">
      <base-card></base-card>
    </md-layout>
    <md-layout md-flex-xsmall="100" md-flex-large="100">
      <base-card></base-card>
    </md-layout>
  </md-layout>
</template>

<script>
import BaseCard from './BaseCard'
import Accordion from './Accordion'

export default {
  name: 'section',
  data () {
    return {
    }
  },
  components: {
    'base-card': BaseCard,
    'accordion': Accordion
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
}
</style>
