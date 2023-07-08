<template>
    <img class="tileImg" :class="currentClass" :src="currentImg" alt="tile">
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      currentClass: null,
      currentImg: null,
      interval1: null,
      speed: 1000
    }
  },
  props: ['randomSpeed'],
  methods: {
    tileChange() {
      this.currentImg = require('@/assets/tiles/tile'+this.randomNumber(11)+'.svg')
      this.currentClass = 'c' + this.randomNumber(7)
    },
    randomNumber(i){
      return  Math.floor(Math.random() * i)
    },
    interval: function() {
      this.interval1 = setInterval(() => {
        this.tileChange()
      },this.speed)
    }
  },
  mounted() {
    this.tileChange()
    if(this.randomSpeed) this.speed = this.randomNumber(6000)+2000
    this.interval()
  }
}
</script>

<style>

#tiles .tile{
  width: calc(100% / 6);
}
</style>