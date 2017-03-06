<template>
  <md-card :class="[{'md-with-hover': withHover}, type, data._entitytype]" v-on:click.native="navigate()">
    <md-card-media>
      <img :src="imageSrc" alt="Random Image" class="loading" onload="this.classList.remove('loading')">
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
        <md-button v-for="link of links">
          <router-link v-if="!link.external" :to="link.url" class="alink-internal">{{link.title}}</router-link>
          <a v-else-if="link.external" target="_blank" :href="link.url" class="alink-external">{{link.title}}</a>
        </md-button>
      </md-card-actions>
    </md-card-area>
    <md-ink-ripple />
  </md-card>
</template>

<script>
export default {
  name: 'base-card',
  props: ['type', 'data'],
  data () {
    return {}
  },
  computed: {
    title () {
      if (this.data && this.data.title) {
        return this.data.title
      } else return ''
    },
    excerpt () {
      if (this.data && this.data.excerpt) {
        return this.data.excerpt
      } else return ''
    },
    links () {
      if (this.data) {
        if (this.data.links) {
          return this.data.links
        } else if (this.data.uri || this.data.url) {
          return [{
            title: 'Les mer',
            url: this.data.uri || this.data.url,
            external: false
          }]
        }
      }
      return null
    },
    withHover () {
      return Array.isArray(this.links) ? this.links.length === 1 : false
    },
    imageRatio () {
      return this.type === 'square' ? '1:1' : '16:9'
    },
    imageSrc () {
      if (this.data && this.data.image) {
        if (typeof this.data.image === 'string') return this.data.image
        if (this.data.image.styles) {
          let src = ''
          // this.data.image.styles[this.type]
          if (!src) {
            switch (this.type) {
              case 'hero' : src = this.data.image.styles['article']
                break
              case 'square' : src = this.data.image.styles['square_small']
                break
              default : src = this.data.image.styles['article_small']
            }
          }
          return src || this.data.image.src
        }
        return this.data.image.src
      } else {
        return 'https://unsplash.it/g/' + (this.type === 'square' ? '900' : '1600/900') + '?random&ts=' + Date.now()
      }
    },
    redTitle () {
      return ['blog', 'full', 'hero'].indexOf(this.type) > -1
    },
    showAuthor () {
      return this.type === 'blog'
    }
  },
  methods: {
    navigate (path) {
      if (!path && this.links && this.links.length) {
        path = this.links[0].url
      }
      if (path) setTimeout(() => this.$router.push(path), 200)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/mixin";

.md-card.md-theme-default {
  width: 100%;
  margin: 10px;
  text-align: left;

  .md-card-media {
    img.loading {
      min-height: 200px;
      min-width: 200px;
      background: url(../assets/loader.gif);
      background-size: 50px;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }

  &.square {
    flex-direction: row;

    .md-card-media {
      flex-basis: 50%;
    }

    .md-card-area {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .md-card-content {
        padding-bottom: 4px;
        font-size: 16px;
        font-weight: 300;
      }
    }

    &.node_preview {
      @media (min-width:481px) and (max-width:768px) {
        flex-direction: column;
      }
    }
  }

  &.big_card {
    .md-card-area {
      .md-title {
        font-size: 36px;
        line-height: 36px;

        @media all and (max-width:960px) {
          font-size: 28px;
          line-height: 28px;
        }
        @media all and (max-width:768px) {
          font-size: 21px;
          line-height: 21px;
        }
        @media all and (max-width:600px) {
          font-size: 18px;
        }
      }

      .md-card-content {
        font-size: 28px;
        line-height: 32px;

        @media all and (max-width:1280px) {
          font-size: 25px;
          line-height: 27px;
        }
        @media all and (max-width:960px) {
          font-size: 21px;
          line-height: 23px;
        }
        @media all and (max-width:768px) {
          font-size: 18px;
          line-height: 20px;
        }
        @media all and (max-width:600px) {
          font-size: 16px;
          line-height: 18px;
        }
      }
    }

    @media all and (max-width:481px) {
      flex-direction: column;
    }
  }

  &.hero {
    .md-card-media {
      h2 {
        font-size: 22px;
        line-height: 24px;

        @media all and (max-width:960px) {
          font-size: 20px;
          line-height: 22px;
        }
        @media all and (max-width:768px) {
          font-size: 18px;
          line-height: 20px;
        }
      }
    }
    .md-card-area {
      .md-card-content {
        font-size: 18px;
      }
    }
    .md-card-actions {
      margin: 12px;
      button {
        border: 2px solid transparent;
      }
      button:last-child {
        border: 2px solid $blue;
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
      padding: 0;
      a {
        display: block;
        color: $blue;
        padding: 4px 12px;
        font-size: 20px;
        text-transform: capitalize;

        @media all and (max-width:960px) {
          font-size: 19px;
        }
        @media all and (max-width:768px) {
          font-size: 18px;
        }
        @media all and (max-width:600px) {
          font-size: 17px;
        }
        @media all and (max-width:480px) {
          font-size: 16px;
        }
      }

      &:hover {
        background: $blue;
        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
