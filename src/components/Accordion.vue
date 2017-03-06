<template>
  <md-card class="accordion">
    <ui-collapsible v-for="(item, index) of items" :open="active == index" @open="active = index" :removeIcon="true">
      <div slot="header">
        <md-icon class="icon-area">{{item.icon}}</md-icon>
        <div class="title-area">
          <h3>{{item.title}}</h3>
          <p>{{item.byline}}</p>
        </div>
        <span class="toggle-icon"></span>
      </div>
      <div class="body" v-html="item.body"></div>
    </ui-collapsible>
  </md-card>
</template>

<script>
import UiCollapsible from 'keen-ui/lib/UiCollapsible'

export default {
  name: 'accordion',
  props: ['init'],
  data () {
    return {
      active: -1,
      items: []
    }
  },
  components: {
    'ui-collapsible': UiCollapsible
  },
  created () {
    this.loadInit()
  },
  watch: {
    'init': this.loadInit
  },
  methods: {
    loadInit () {
      if (this.init) {
        this.items = this.init.items
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/mixin";

.accordion {
  width: 100%;
  margin: 10px;
  background: #fff;

  .ui-collapsible, .ui-collapsible__header {
      background: #fff;
      margin: 0;
  }
  .ui-collapsible__header {
    border-top: 1px solid #eee;

    &-content {
      width: 100%;
      text-align: left;
    }

    .icon-area {
      display: inline-block;
      vertical-align: top;
      color: $blue;
      font-size: 50px;
      width: 60px;
      text-align: center;
    }

    h3 {
      margin: 0 5px;
      font-size: 24px;
      color: #000;
    }

    .title-area {
      display: inline-block;

      p {
        color: $grey;
        font-size: 14px;
        margin: 5px;
      }
    }

    .toggle-icon {
      &:before {
        background: #000000;
        content: ' ';
        height: 100%;
        left: 50%;
        position: absolute;
        top: 0;
        width: 1px;
      }
      &:after {
        background: #000000;
        content: ' ';
        height: 100%;
        left: 50%;
        position: absolute;
        top: 0;
        width: 1px;
        transform: rotate(90deg);
      }
    }

    &:hover {
      .toggle-icon {
        transform: rotate(15deg);
      }
    }
  }

  .is-open .ui-collapsible__header .toggle-icon {
    transform: rotate(45deg);
  }
  .toggle-icon {
    display: block;
    float: right;
    margin: 10px;
    height: 30px;
    position: relative;
    transform: rotate(0);
    transition: 0.3s transform;
    width: 30px;
  }

  .ui-collapsible__body {
    text-align: left;
    border: none;
  }
}
</style>
