<template>
  <md-card class="accordion">
    <ui-collapsible :open="active == 0" @open="active = 0" :removeIcon="true">
      <div slot="header">
        <md-icon class="icon-area">movie</md-icon>
        <div class="title-area">
          <h3>This is title</h3>
          <p>This is byline</p>
        </div>
        <span class="toggle-icon"></span>
      </div>
      <div class="body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nemo suscipit ipsa molestias, tempora dolor natus modi et incidunt tenetur!
      </div>
    </ui-collapsible>

    <ui-collapsible :open="active == 1" @open="active = 1" :removeIcon="true">
      <div slot="header">
        <md-icon class="icon-area">hd</md-icon>
        <div class="title-area">
          <h3>This is title</h3>
        </div>
        <span class="toggle-icon"></span>
      </div>
      <div class="body">
        <b>Howdy!</b>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolore, numquam inventore esse consequatur doloribus pariatur accusantium voluptatum veritatis soluta corrupti impedit, asperiores accusamus! Ullam perferendis, ipsum officia consequatur quam! Sapiente nisi quam voluptates ipsam consequatur autem culpa repudiandae dignissimos.</p>

        <a tabindex="0">A link here</a>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolore, numquam inventore esse consequatur doloribus pariatur accusantium voluptatum veritatis soluta corrupti impedit, asperiores accusamus! Ullam perferendis, ipsum officia consequatur quam! Sapiente nisi quam voluptates ipsam consequatur autem culpa repudiandae dignissimos.</p>
      </div>
    </ui-collapsible>

    <ui-collapsible :open="active == 2" @open="active = 2" :removeIcon="true">
      <div slot="header">
        <md-icon class="icon-area">note</md-icon>
        <div class="title-area">
          <h3>This is title</h3>
        </div>
        <span class="toggle-icon"></span>
      </div>
      <div class="body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nemo suscipit ipsa molestias, tempora dolor natus modi et incidunt tenetur!
      </div>
    </ui-collapsible>

    <ui-collapsible :open="active == 3" @open="active = 3" :removeIcon="true">
      <div slot="header">
        <md-icon class="icon-area">info</md-icon>
        <div class="title-area">
          <h3>This is title</h3>
          <p>This is byline</p>
        </div>
        <span class="toggle-icon"></span>
      </div>
      <div class="body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nemo suscipit ipsa molestias, tempora dolor natus modi et incidunt tenetur!
      </div>
    </ui-collapsible>
    </div>
  </md-card>
</template>

<script>
import UiCollapsible from 'keen-ui/lib/UiCollapsible'

export default {
  name: 'accordion',
  data () {
    return {
      active: -1
    }
  },
  components: {
    'ui-collapsible': UiCollapsible
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
      color: $blue;
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
