<template>
    <md-card class="cta-card" v-if="data">
      <h3>{{data.title}}</h3>
      <p>{{data.text}}</p>
      <div class="actions">
        <md-button v-for="link of data.links">
            <router-link v-if="!link.external" :to="link.url" class="alink-internal">{{link.title}}</router-link>
            <a v-else-if="link.external" target="_blank" :href="link.url" class="alink-external">{{link.title}}</a>
        </md-button>
      </div>
    </md-card >
</template>

<script>
export default {
  name: 'cta-card',
  props: ['data']
}
</script>

<style lang="scss">
@import "../assets/mixin";

.md-theme-default.md-card.cta-card {
    margin: 10px;
    background: $grey;
    padding: 24px;
    color: #fff;
    text-align: center;
    width: 100%;

    h3 {
        font-size: 34px;

        @media all and (max-width:960px) {
          font-size: 28px;
        }
        @media all and (max-width:600px) {
          font-size: 26px;
        }
    }

    p {
        font-weight: 300;
        font-size: 24px;
        line-height: 26px;

        @media all and (max-width:960px) {
          font-size: 20px;
          line-height: 22px;
        }
        @media all and (max-width:600px) {
          font-size: 18px;
          line-height: 20px;
        }
    }

    .actions {
        text-align: center;
        position: absolute;
        width: 100%;
        bottom: 14px;
        left: 0;

        button {
            display: block;
            margin: 10px auto;
            min-width: 50%;
            background: $red;
            color: #fff;

            a {
                display: block;
                padding: 4px;
                width: 100%;
                color: #fff;
                font-weight: 600;
                text-transform: capitalize;
                text-decoration: none;
            }

            &:hover {
                background: #fff;
                a {
                    color: $red;
                }
            }
        }
    }

    @media all and (max-width:960px) {
        padding: 10px;

        .actions {
            position: relative;
            width: 100%;
            bottom: auto;

            button {
                display: inline-block;
                margin: 10px 5px;
                min-width: 35%;
            }
        }
    }
}
</style>
