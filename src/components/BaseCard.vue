<template>
  <transition name="slide">
    <span v-show="show">
      <md-card :class="[{'md-with-hover': withHover}, type]" v-on:click.native="navigate(links[0].url)">
        <md-card-media :md-ratio="imageRatio">
          <img :src="imageSrc" alt="Random Image">
          <h2 v-if="redTitle">{{title}}</h2>
        </md-card-media>
        <md-card-area v-if="type != 'full'">
          <md-card-header v-if="showAuthor">
            <md-avatar>
              <img src="https://unsplash.it/200/?people" alt="People">
            </md-avatar>
            <div class="md-title">Akinn Joakim</div>
            <div class="md-subhead">14 December 2017</div>
            <div class="md-subhead">#Sport #Bare for deg</div>
          </md-card-header>
          <md-card-header v-else="!showAuthor">
            <div v-if="!redTitle" class="md-title">{{title}}</div>
          </md-card-header>
          <md-card-content v-if="!showAuthor">
            {{excerpt}}
          </md-card-content>
          <md-card-actions v-if="links">
            <md-button v-for="link of links" v-on:click.native.stop="navigate(link.url)">{{link.title}}</md-button>
          </md-card-actions>
        </md-card-area>
      </md-card>
    </span>
  </transition>
</template>

<script>

export default {
  name: 'base-card',
  props: ['type', 'data'],
  data () {
    return {
      show: false
    }
  },
  created () {
    setTimeout(() => {
      this.show = true
    }, 100)
  },
  computed: {
    title () {
      if (this.data && this.data.title) {
        return this.data.title
      } else return 'Random title'
    },
    excerpt () {
      if (this.data && this.data.excerpt) {
        return this.data.excerpt
      } else return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    links () {
      if (this.data && this.data.links) {
        return this.data.links
      } else if (this.type === 'full') {
        return null
      } else {
        return [
          {
            title: 'Les mer',
            url: '/login',
            external: false
          }
        ]
      }
    },
    withHover () {
      return Array.isArray(this.links) ? this.links.length === 1 : false
    },
    imageRatio () {
      return this.type === 'square' ? '1:1' : '16:9'
    },
    imageSrc () {
      if (this.data && this.data.image) {
        if (this.data.image.styles && this.data.image.styles[this.type]) {
          return this.data.image.styles[this.type]
        } else return this.data.image.src
      } else return 'https://unsplash.it/' + (this.type === 'square' ? '900' : '1600/900')
    },
    redTitle () {
      return this.type === 'blog' || this.type === 'full'
    },
    showAuthor () {
      return this.type === 'blog'
    }
  },
  methods: {
    navigate (path) {
      console.log('navigating... %s', path)
      window.rootRouter.push(path)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";

span {
  width: 100%;
}
.md-card.md-theme-default {
  margin: 10px;
  text-align: left;

  &.square {
    flex-direction: row;

    .md-card-media {
      flex-basis: 50%;
    }

    .md-card-area {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .md-card-content {
        padding-bottom: 4px;
      }
    }
  }

  .md-avatar {
    width: 60px;
    height: 60px;
  }

  .md-card-media {
    h2 {
      background: $red;
      color: #fff;
      position: absolute;
      bottom: 5%;
      left: 5%;
      padding: 10px;
      font-size: 24px;
    }
  }

  .md-card-actions {
    flex-direction: row;
    flex: 1;
    align-items: flex-end;
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
