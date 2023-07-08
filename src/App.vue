<template>
  <router-view v-slot="{ Component, route }">
    <MainNav v-if="route.name !== 'home' && route.name !== 'login'" />
    <transition name="slide" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import AuthService from './services/auth-user'

export default {
  data() {
    return {
      showModal: false,
      userIdApp: this.$store.state.id
    }
  },
  mounted() {
    AuthService()

  },
  components: { MainNav },
  methods: {

  },
  created() {

    this.emitter.on('TraceClick', (evt) => {
      console.log('Trace ID', evt.id, evt.user)
    })
  },
}
</script>

<style lang="scss">
//$mainFont : Avenir, Helvetica, Arial, sans-serif;
$mainFont-color : rgb(85, 85, 85);

:root {
  --iris-color1: #ffd31e;
  --iris-color2: #ff7e1e;
  --iris-color3: #5c10bb;
  --iris-color4: #4082bf;
  --iris-color5: #de4999;
  --iris-color6: #0dbf48;
  --iris-color7: #CC3333;
  --iris-color8: #3BE2CA;
  --iris-color9: #0F5EBC;
  --iris-inactive1: #ffe88a;
  --iris-inactive2: #b4d2e4;

  --mainFont-color: rgb(85, 85, 85);
}

.iris {
  //color: black !important;

  &.f0 {
    background-color: var(--iris-color1) !important;
  }

  &.f1 {
    background-color: var(--iris-color2) !important;
  }

  &.f2 {
    background-color: var(--iris-color3) !important;
  }

  &.f3 {
    background-color: var(--iris-color4) !important;
  }

  &.f4 {
    background-color: var(--iris-color5) !important;
  }

  &.f5 {
    //background-color: var(--iris-color6) !important;
    background-color: var(--iris-color3) !important;
  }

  &.f6 {
    background-color: var(--iris-color7) !important;
  }

  &.f7 {
    background-color: var(--iris-color8) !important;
  }

  &.f8 {
    background-color: var(--iris-color9) !important;
  }

  &.f0,
  &.f1,
  &.f5,
  &.f7 {
    color: black !important;

    a {
      color: black !important;
    }
  }

  &.f2,
  &.f3,
  &.f6,
  &.f8,
  &.f5 {
    color: white !important;

    a {
      color: white !important;
    }
  }

  a {
    color: black !important;
  }
}

.c0 {
  filter: invert(87%) sepia(95%) saturate(2661%) hue-rotate(331deg) brightness(98%) contrast(104%);
}

.c1 {
  filter: invert(69%) sepia(94%) saturate(3487%) hue-rotate(345deg) brightness(101%) contrast(103%);
}

.c2 {
  filter: invert(16%) sepia(73%) saturate(3666%) hue-rotate(262deg) brightness(85%) contrast(118%);
}

.c3 {
  filter: invert(49%) sepia(17%) saturate(1438%) hue-rotate(167deg) brightness(93%) contrast(102%);
}

.c4 {
  filter: invert(50%) sepia(88%) saturate(3405%) hue-rotate(301deg) brightness(92%) contrast(89%);
}

.c5 {
  filter: invert(49%) sepia(96%) saturate(445%) hue-rotate(88deg) brightness(96%) contrast(93%);
}

.c6 {
  filter: invert(21%) sepia(92%) saturate(1875%) hue-rotate(342deg) brightness(103%) contrast(87%);
}

.c7 {
  filter: invert(75%) sepia(100%) saturate(306%) hue-rotate(105deg) brightness(88%) contrast(101%);
}

.c8 {
  filter: invert(29%) sepia(85%) saturate(1469%) hue-rotate(192deg) brightness(87%) contrast(93%);
}

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $mainFont-color;
  margin: 0 auto;

  a,
  a:hover,
  a:visited,
  a:active {
    color: inherit;
    text-decoration: none;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
  opacity: 1;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(10%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

.gradientBG {
  background: linear-gradient(-45deg,
      var(--iris-color1),
      var(--iris-color2),
      var(--iris-color3),
      var(--iris-color4),
      var(--iris-color5),
      var(--iris-color2));
  background-size: 150% 380%;
  animation: gradient 30s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 100% 100%;
  }

  50% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 100%;
  }
}

h1 {
  font-size: 48px;

  .tileImg {
    height: 48px;
    width: auto;
  }
}

h2 {
  font-size: 24px;

  &.big {
    font-size: 36px;
  }
}

h3 {
  color: var(--iris-color4);
}

p {
  margin-bottom: 40px;
}

.main-content {
  margin: 30px 20px;
}

.checkimg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/tiles/tile-check.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  /*  &:before {
      display: block;
      width: 100%;
      height: 100%;
      font:{
        family: 'FontAwesome';
        size: 36px;
      }
      text-align:center;
      padding-top: 0px;
      top: 0;
      right: 0;
      content: "\f00c"; 
    }*/
}

.main-view {
  min-height: calc(100vh - 80px - 40px);
}

.btn-main {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 30px 20px;
  font-size: 18px;
  font-weight: bold;
  border: 0px;
}

.btn-sec {
  width: 100%;
  background-color: transparent;
  color: black;
  border: rgba(0, 0, 0, 0.5) thin solid;
  margin: 10px 0 !important;
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
}

.btn-mid {
  width: 48%;
  margin-left: 1% !important;
  margin-right: 1% !important;
}

.btn-circle {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  font-size: 34px;
  padding: 18px 0;
  margin: 0 20px
}

.btn-line {
  width: 100%;
  padding: 20px;
  border: none;
  border-top: thin solid black;
  border-bottom: thin solid black;
  font-weight: bold;
  font-size: 18px;
}

ul,
li {
  margin: 0;
  padding: 0;
}

.left-column {
  border-right: thin solid var(--iris-inactive2);
  border-bottom: thin solid var(--iris-inactive2);
}

.head {
  height: 300px;
  background-color: #eee;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;


  h2 {
    width: 100%;
    padding: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-weight: bold;
  }

  .places {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: var(--iris-color5);
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
}

@media only screen and (max-width: 768px) {
  .left-column {
    border-right: none;
  }
}
</style>
