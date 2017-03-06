<template>
  <div class="search">
    <input type="text" v-bind:placeholder="placeholder" @keyup.enter="submit" v-model="value"><button @click="submit"><md-icon>{{icon}}</md-icon></button>
  </div>
</template>

<script>
export default {
  name: 'input-box',
  props: ['placeholder', 'icon', 'init'],
  data () {
    return {
      value: '',
      delay: null
    }
  },
  methods: {
    submit () {
      if (this.value) this.$emit('onSubmit', this.value)
    }
  },
  watch: {
    init (val) {
      this.value = val || ''
    },
    value (val) {
      clearTimeout(this.delay)
      this.delay = setTimeout(() => {
        this.$emit('onChange', this.value)
      }, 250)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
@import "../assets/mixin";

.search {
  input {
    padding: 6px;
    opacity: 0;
    width: 0;
    font-size: 12px;
    background: $search;
    color: $search-text;
    border: none;
    vertical-align: top;
    height: 30px;
    transition: 0.2s all ease;

    &:focus {
      outline: $blue solid thin;
      border: 1px solid $blue;
      width: calc(100% - 30px);
      opacity: 1;
    }
  }

  button {
    background-color: #fff;
    height: 30px;
    width: 30px;
    padding: 3px;
    vertical-align: top;
  }

  &:hover, &:active {
    input {
      width: calc(100% - 30px);
      opacity: 1;
    }
    button {
      background-color: $blue;
      color: #fff;
    }
  }
}
</style>
