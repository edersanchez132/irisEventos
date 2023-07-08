<template>
    {{s}}
</template>

<!--Por el momento, hay que cambiar también en la función del calendario de DetalleEventoView-->

<script>
export default{
    props: ['hour','limit'],
    data(){
        return{
            s: null
        }
    },
    mounted(){
        if (this.limit) this.SwitchHourLimit()
        else this.SwitchHour(this.hour)
    },
    methods:{
        SwitchHour(h){
            switch(h){
                case 0: this.s = '19:30'; break
                case 1: this.s = '20:00'; break
                case 2: this.s = '20:30'; break

                case 1001: this.s = '19:00'; break //Bienvenida
                case 1002: this.s = '21:00'; break //Cierre
            }
        },
        SwitchHourLimit(){
            switch(this.hour){
                case 0: this.s = '19:28'; break
                case 1: this.s = '19:58'; break
                case 2: this.s = '20:28'; break
            }
        }
    }
}
</script>