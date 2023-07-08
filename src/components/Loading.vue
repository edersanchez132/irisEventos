<template>
    <div class="loader">
        <div class="loader-content">
            <img :class="color" src="@/assets/layout/loader.svg" alt="Loading...">
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            color: null
        }
    },
    mounted() {
        this.color = 'c' + Math.floor(Math.random() * 7)
    }
}
</script>

<style>
.loader{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 50px;
}

.loader-content{
    width: 60px;
    height: 60px;
    animation: loading 2s ease-in-out infinite;
    transition-delay: 1s;
}

@keyframes loading{
    0%{
        transform: rotate( 0deg) scale(.2);
        opacity: 0;
        
    }
    50% {
        transform: rotate(180deg) scale(1);
        opacity: 1;
    }
    100% {
        transform: rotate(360deg) scale(.2);
        opacity: 0;
    }
}
</style>