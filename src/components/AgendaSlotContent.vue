<template>
    <div class="content">
        <div v-if="showImage" class="img">
            <div class="img-container" :style="{backgroundImage: `url(${image})`}"></div>
            <!--div class="img-container" :style="{backgroundImage: `url(${require(`@/assets/tiles/tile-check.svg`)})`, backgroundImage: `url(${image})` }"></div-->
        </div>
        <div class="info">
        <div class="title">{{slot.title}}</div>
        <div class="text">{{slot.desc}}</div>
        </div>
        <div v-if="slot.link" class="arrow"><i class="fa-solid fa-chevron-right"></i></div>
    </div>
</template>

<script>
export default {
    props:['slot'],
    data(){
        return{
            showImage: false,
            image: null
        }
    },
    mounted(){
        if(this.slot.outdated){
            this.image = 'tiles/tile-check.svg'
            this.showImage = true
        }
        else if(this.slot.img){
            this.image = this.slot.img
            this.showImage = true
        }
    }
}
</script>

<style scoped>
.img-container{ 
    background-color: #eee;
}
.img-container{ 
    background-color: #eee;
}
</style>