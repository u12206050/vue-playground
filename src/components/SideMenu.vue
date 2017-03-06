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
          <p v-if="link.links && link.links.length" v-on:click="activeMenu = link">
            {{link.title}}
            <button><span>{{link.links.length}}</span><md-icon class="icon">keyboard_arrow_right</md-icon></button>
          </p>
          <p v-else-if="link.url" v-on:click="closeMenu()">
            <router-link v-if="!link.external" :to="link.url" class="alink-internal">{{link.title}}</router-link>
            <a v-else-if="link.external" target="_blank" :href="link.url" class="alink-external">{{link.title}}</a>
          </p>
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
export default {
  name: 'side-menu',
  props: ['name'],
  data () {
    return {
      activeMenu: null,
      layers: null
    }
  },
  computed: {
    menuApi () {
      return this.$store.state.api.menu + '/' + this.name
    },
    isOpen () {
      return this.$store.state.sideMenu && this.$store.state.sideMenu.open
    },
    menuData () {
      if (this.$store.state.sideMenu) {
        return JSON.parse(JSON.stringify(this.$store.state.sideMenu.data))
      }
    }
  },
  watch: {
    isOpen (open) {
      if (!this.activeMenu) return
      if (open) {
        this.openMenu(true)
      } else this.closeMenu(true)
    },
    menuData (data) {
      if (data) {
        this.layers = []
        let getLayers = (menu, parent = null) => {
          menu.__parent = parent
          if (menu.links && menu.links.length) {
            if (menu.url) {
              menu.links = [{
                title: menu.title,
                url: menu.url,
                external: !!menu.external
              }, ...menu.links]
            }
            menu.links.forEach(l => {
              if (l.links && l.links.length) {
                getLayers(l, menu)
              }
            })
            this.layers.push(menu)
          }
        }
        getLayers(data)
        this.activeMenu = data
      }
    }
  },
  created () {
    if (!this.$store.state.sideMenu) {
      this.$store.registerModule('sideMenu', {
        namespaced: true,
        state: {
          open: false,
          data: null
        },
        mutations: {
          toggleMenu (state, open) {
            if (typeof open === 'undefined' || open === null) {
              state.open = !state.open
            } else {
              if (state.open !== !!open) {
                state.open = !!open
              }
            }
          },
          loadData (state, data) {
            state.data = data
          }
        }
      })
      this.$http.get(this.menuApi)
      .then(res => {
        this.$store.commit('sideMenu/loadData', res.data)
      })
      .catch(error => {
        console.warn('Loading SideMenu has error: ' + error.message || error.response.status)
      })
    }
  },
  methods: {
    openMenu (silent) {
      this.$refs.menu.open()
      if (!silent) this.$store.commit('sideMenu/toggleMenu', true)
    },
    closeMenu (silent) {
      this.$refs.menu.close()
      if (!silent) this.$store.commit('sideMenu/toggleMenu', false)
    },
    close () {
      // this.activeMenu = this.menuData
      this.$store.commit('sideMenu/toggleMenu', false)
    },
    open () {
      this.$store.commit('sideMenu/toggleMenu', true)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/mixin";

.md-theme-side-menu.md-sidenav {
  .md-sidenav-content, .md-list {
    color: $red;
    background: #fff;
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

      p {
        cursor: pointer;
        width: 100%;
        display: block;
        font-weight: 300;
        color: $red;
        position: relative;
        margin: 0;

        button {
          position: absolute;
          font-size: 14px;
          font-weight: 300;
          height: 100%;
          right: -10px;
          top: -4px;
          background: none;
          transition: 0.2s right ease;

          span {
            vertical-align: middle;
          }

          .icon {
            vertical-align: middle;
            font-size: 28px;
            color: $red;
          }
        }
      }

      a {
        left: 0;
        transition: 0.2s left ease;

        &:hover {
          text-decoration: none;
        }

        &.router-link-active {
          color: #333;
          &:before {
            content: 'visibility';
            font-family: 'Material Icons';
            vertical-align: middle;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
