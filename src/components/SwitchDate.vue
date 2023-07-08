<template>
    {{`${s.dayWeek} ${s.day} de ${s.month} de ${s.year}`}}
</template>

<script>
export default {
    props: ['date'],
    data(){
        return{
            s: {
                dayWeek: null,
                day: null,
                month: null,
                year: null
            }
        }
    },
    mounted(){
        this.DateString(this.date)
    },
    methods:{
        DateString(d){
            this.s.dayWeek =  this.WeekDay(d.getDay())
            this.s.day = d.getDate()
            this.s.month =  this.Month(d.getMonth())
            this.s.year = d.getFullYear()
        },

        WeekDay(d){
            switch (d){
                case 0: return 'domingo'; break
                case 1: return 'lunes'; break
                case 2: return 'martes'; break
                case 3: return 'miércoles'; break
                case 4: return 'jueves'; break
                case 5: return 'viernes'; break
                case 5: return 'sábado'; break
            }
        },

        Month(d){
            switch (d){
                case 0: return 'enero'; break
                case 1: return 'febrero'; break
                case 2: return 'marzo'; break
                case 3: return 'abril'; break
                case 4: return 'mayo'; break
                case 5: return 'junio'; break
                case 6: return 'julio'; break
                case 7: return 'agosto'; break
                case 8: return 'septiembre'; break
                case 9: return 'octubre'; break
                case 10: return 'noviembre'; break
                case 11: return 'diciembre'; break
            }
        }
    }
}
</script>