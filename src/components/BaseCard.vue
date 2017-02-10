<template>
  <md-card v-bind:class="{'md-with-hover': withHover}">
    <md-card-media v-if="type == 'square'" md-ratio="1:1">
      <img src="https://unsplash.it/900/900/?random" alt="Random Image">
    </md-card-media>
    <md-card-media v-else="type == 'wide'" md-ratio="16:9">
      <img src="https://unsplash.it/1600/900/?random" alt="Random Image">
    </md-card-media>
    <md-card-header>
      <div class="md-title">Title goes here</div>
    </md-card-header>
    <md-card-content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
    </md-card-content>
    <md-card-actions>
      <md-button>Action</md-button>
      <md-button>Link</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'base-card',
  props: ['type'],
  computed: {
    withHover () {
      return true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";

.md-card.md-theme-default {
    margin: 10px;

    .md-card-actions {
      button.md-button.md-theme-default {
        color: $blue;

        &:hover {
          background: $blue;
          color: #fff;
        }
      }
    }
}
</style>
