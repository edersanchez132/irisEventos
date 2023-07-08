<template>
    <div :id="'timeLimit'+index" class="timeLimit"><SwitchHour :hour="slot.hour"/></div>
    
    <div class="item" :class="slot.type, outdated">
        <div class="time"><span><SwitchHour :hour="slot.hour" /></span></div>
        <RouterLink style="width: 100%" v-if="slot.link && outdated != 'outdated'" :to="{path : slot.link}">
            <AgendaSlotContent :slot="slot" />
        </RouterLink>
        <div style="width: 100%" v-else>
            <AgendaSlotContent :slot="slot" />
        </div>
    </div>
</template>

<script>
import AgendaSlotContent from '@/components/AgendaSlotContent.vue'
import SwitchHour from '@/components/SwitchHour.vue'

export default{
    props:['slot', 'index'],
    components:{AgendaSlotContent, SwitchHour},
    data(){
        return{
            outdated: ''
        }
    },
    mounted(){
        if (this.slot.type == '') this.checkTimeView(this.slot.hour)
        else this.outdated = this.outdated = this.checkTime(this.slot.hour)
    },
    methods:{
        checkTime(t){
            let currentDate = new Date()
            let checkDate = new Date(`${this.eventDate}T${$('#timeLimit'+this.index).html()}`)

            if(checkDate < currentDate) return 'outdated'
            else return ''
        },

        checkTimeView(t){
            if (this.checkTime(t) == 'outdated') return 'hidden'
        },
    }
}
</script>