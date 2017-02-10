<template>
  <md-theme md-name="side-menu" v-if="activeMenu">
    <md-sidenav class="md-right" ref="menu" @open="open()" @close="close()">
      <div class="menu_title">
        <button class="btn-l" v-if="activeMenu.__parent" v-on:click="activeMenu = activeMenu.__parent"><md-icon class="icon">keyboard_arrow_left</md-icon></button>
        <button class="btn-r" v-on:click="closeMenu()"><md-icon class="icon">close</md-icon></button>
        <h2>{{ activeMenu.title }}</h2>
      </div>
      <md-list v-for="layer of layers" class="layer" :class="{ 'active': layer == activeMenu, 'parent': layer == activeMenu.__parent }">
        <md-list-item v-for="link of layer.links" class="uhov">
          <p v-if="link.url" v-on:click="closeMenu()">
            <router-link v-if="!link.external" :to="link.url" class="alink-internal">{{link.title}}</router-link>
            <a v-else-if="link.external" target="_blank" :href="link.url" class="alink-external">{{link.title}}</a>
          </p>
          <p v-else-if="!link.url">{{link.title}}</p>
          <button v-if="link.links && link.links.length" v-on:click="activeMenu = link"><span>{{link.links.length}}</span><md-icon class="icon">keyboard_arrow_right</md-icon></button>
        </md-list-item>
      </md-list>
      <md-list class="bottom">
        <md-list-item>
          <small>Copyright © Nasjonalt senter for realfagsrekruttering 2017 All Rights Reserved.</small>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </md-theme>
</template>

<script>
import axios from 'axios'

export default {
  name: 'side-menu',
  props: {
    toggleMenu: Number
  },
  data () {
    return {
      menuData: {},
      activeMenu: null,
      layers: null,
      menuApi: require('../settings.js').menuApi
    }
  },
  watch: {
    toggleMenu: function (state) {
      this.toggle(state)
    }
  },
  created () {
    this.loadMenu()
    var self = this
    window.eventBus.$on('side-menu', function (state) {
      self.toggle(state)
    })
  },
  methods: {
    toggle (state) {
      if (!this.activeMenu) return
      if (state) {
        this.openMenu()
      } else this.closeMenu()
    },
    openMenu () {
      this.$refs.menu.open()
    },
    closeMenu () {
      this.$refs.menu.close()
    },
    loadMenu () {
      var self = this
      axios.get(this.menuApi)
      .then(function (response) {
        self.menuData = response.data
        self.generateLayers()
      })
      .catch(function (error) {
        console.warn('SideMenu has error: ' + error.message || error.response.status)
      })
    },
    generateLayers () {
      this.layers = []
      let getLayers = (menu, parent = null) => {
        menu.__parent = parent
        if (menu.links && menu.links.length) {
          menu.links.forEach(l => {
            if (l.links && l.links.length) {
              getLayers(l, menu)
            }
          })
          this.layers.push(menu)
        }
      }
      getLayers(this.menuData)
      this.activeMenu = this.menuData
    },
    open () {
      /* menuResource.getMenu$('Hovedmeny').subscribe( data => {
        if (!data) return
        data.title = 'Meny'
        this.menuData = data
        this.layers = []
        getLayers(this.menuData)
        this.activeMenu = this.menuData
      }) */
      this.$emit('state', 1)
    },
    close () {
      this.activeMenu = this.menuData
      this.$emit('state', 0)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/mixin";

.md-theme-side-menu.md-sidenav {
  .md-sidenav-content, .md-list {
    color: #fff;
    background: $blue;
  }

  .md-sidenav-content {
    width: 300px;
    height: 100%;
    padding: 0 10px 20px;
    overflow: hidden;

    @media all and (max-width:600px) {
      max-width: 100%;
    }

    .menu_title {
      h2 {
        text-align: center;
        font-size: 26px;
        font-weight: 300;
        padding: 0 40px;
      }

      button {
        vertical-align: middle;

        &.btn-l {
          float: left;
        }

        &.btn-r {
          float: right;
        }

        .icon {
          font-size: 35px;
          direction: rtl;
        }
      }
    }

    .bottom {
        position: absolute;
        bottom: 10px;
    }

    .layer {
      transition: 0.4s all ease;
      position: absolute;
      width: 100%;
      right: -100%;
      height: 100%;
      opacity: 0;

      &.active {
        right: 0;
        opacity: 1;
      }

      &.parent {
        right: 100%;
        opacity: 0;
      }
    }

    li {
      width: 100%;
      position: relative;
      padding: 0 10px;

      &:hover {
          background: rgba(0,0,0,0.1);
      }

      a, p {
        width: 100%;
        display: block;
        font-weight: 300;
        color: #fff;
        position: relative;
      }

      p {
        cursor: default;
        padding: 0 50px 0 0;
      }

      a {
        left: 0;
        transition: 0.2s left ease;

        &:hover {
          text-decoration: none;
          left: 10px;
        }

        &.router-link-active {
          &:before {
            content: 'visibility';
            font-family: 'Material Icons';
            vertical-align: middle;
            margin-right: 10px;
          }
        }
      }

      button {
        position: absolute;
        font-size: 14px;
        font-weight: 300;
        height: 100%;
        right: 10px;
        top: 0;
        background: none;
        transition: 0.2s right ease;

        span {
          vertical-align: middle;
        }

        .icon {
          vertical-align: middle;
          font-size: 28px;
          color: #fff;
        }

        &:hover {
          right: 0;
        }
      }
    }
  }
}
</style>
