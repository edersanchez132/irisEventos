<template>
    <div class="percentage">
        <svg width="100%" height="100%" viewBox="0 0 150 150" preserveAspectRatio="xMinYMin meet">
        <circle 
            :cx="70" 
            :cy="70" 
            :r="70" 
            :style="{ 
                strokeWidth : stroke, 
                transform: `translate(${stroke/2}px,${stroke/2}px)`}"
        ></circle>
        <circle 
            :cx="70" 
            :cy="70" 
            :r="70" 
            :style="{ 
                strokeDashoffset: offset, 
                strokeWidth : stroke, 
                transform: `translate(${stroke/2}px,${stroke/2}px)`}"
        ></circle>
        </svg>
        <div v-if="percentage < 100" class="number">
          {{percentage}}<span>%</span>
        </div>
        <div v-else class="number full">
          Lleno
        </div>
    </div>
</template>

<script>

export default{
    props:['amount','total','size','stroke'],
    data(){
        return{
            offset: null,
            percentage: null
        }
    },
    mounted(){
        this.percentage = Math.floor(((this.amount) * 100) / this.total)
        this.offset = 440 - (440 * this.percentage) / 100
    },
    methods:{
    }
}

</script>

<style lang="scss">
.percentage{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  svg{
    position: relative;
    z-index: 100;

    circle{
      fill: none;
      stroke: black;
      transform: translate(5px,5px);
      stroke-dasharray: 440;
      stroke-dashoffset: 440;

      &:nth-child(1){
        stroke-dashoffset: 0;
        stroke: var(--iris-inactive2);
      }

      &:nth-child(2){
        stroke: var(--iris-color3);
      }
    }
  }

  .number{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3em;
    font-weight: 700;

    span{
      font-size: .4em;
    }
  }
}
</style>