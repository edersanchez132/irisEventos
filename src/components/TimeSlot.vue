<template>
    <div v-if="showSlot" class="slot" :class="statusClass" @click="slotAction(status, index, userSlot, userEventsId)"
        v-on:click="TraceEvent(`Time-Slot-${section}-${eventID}-${id}-${status}`, $store.state.id)">
        <div class="row">
            <div class="image col-2">
                <div class="image-container">
                    <div v-if="status === 0">
                        <Percentage :stroke="10" :amount="capacidad - lugares" :total="capacidad" />
                    </div>
                    <div v-else-if="status === 1 || status === 2" class="checkimg"></div>
                </div>
            </div>
            <div v-if="showHour" class="hour col-3">
                <SwitchHour :hour="hora" />
            </div>
            <div v-if="showHour" class="info col-7">
                <div class="message">{{ messageText }}</div>
                <div v-if="showExtra" class="extra">{{ lugaresText }}</div>
            </div>
            <div v-else class="info col-9">
                <div class="message">{{ messageText }}</div>
                <div v-if="showExtra" class="extra">{{ lugaresText }}</div>
            </div>
        </div>
    </div>
    <div v-else>
        <Loading />
    </div>
    <div :id="'timeLimit' + id" class="timeLimit">
        <SwitchHour :hour="hora" :limit="true" />
    </div>
</template>

<script>
import UserService from '../services/user.service'
import Loading from '@/components/Loading.vue'
import Percentage from '@/components/Percentage.vue'
import SwitchHour from '@/components/SwitchHour.vue'

export default {
    data() {
        return {
            status: 0,
            userSlot: null,
            userEvents: null,
            userEventsId: null,
            showSlot: false,
            lugaresText: '',
            messageText: 'Reservar',
            statusClass: 'free',
            fullMessage: false,
            showExtra: true,
            showHour: true,
            intEventID: null,
            currentDate: null,
            eventFinish: null,
            userIdSlot: this.$store.state.id

        }
    },
    props: ['lugares', 'hora', 'id', 'index', 'eventID', 'section', 'capacidad'],
    emits: ['slotAction'],
    components: { Loading, Percentage, SwitchHour },
    mounted() {
        if (localStorage.getItem('token')) {

            setTimeout(() => this.slotTime(), 500)
            this.intEventID = parseInt(this.eventID)
            
        } else {
            this.$router.push('/')
        }
    },
    methods: {
        async slotTime(){
            UserService.getRoomUserContent(this.userIdSlot).then((response) => {
                this.userEvents = response.data.usuario.eventos

                this.userSlot = response.data.usuario.talleres[this.index]
                this.userEvents = response.data.usuario.eventos
                this.userEventsId = response.data.usuario.id_event_user[this.index]
                 setTimeout(() => this.slotStatus(), 500)

            }).catch(error => {
                console.log('This Error getRoomUserContent', error)
            })

        },
        /*slotTime: async function () {
            try {
                const setting = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
                const url =  this.baseURL+ '/room/roomUser/' + this.userIdSlot
                const data = await fetch(url, setting)
                const json = await data.json()
                this.userSlot = json.usuario.talleres[this.index]
                this.userEvents = json.usuario.eventos
                this.userEventsId = json.usuario.id_event_user[this.index]
                this.slotStatus()
            } catch (error) {
                console.log(error)
            }
        },*/

        slotStatus() {
            if (this.Outdated(this.index)) {
                this.status = 5
                this.showSlot = true
            }
            else if (this.lugares === 0 && this.userSlot !== this.id) {
                this.status = 3
                this.showSlot = true
            }
            else {
                if (this.userSlot === this.id) this.status = 1
                else if (this.userSlot !== 0) this.status = 2
                else if (this.userEvents.includes(this.intEventID)) this.status = 4

                this.showSlot = true
            }

            if (this.lugares === 1) this.lugaresText = 'Último lugar disponible'
            else this.lugaresText = this.lugares + ' lugares disponibles'

            switch (this.status) {
                case 0:
                    break;
                case 1:
                    this.messageText = 'Lugar reservado';
                    this.statusClass = 'reserved';
                    this.showExtra = false;
                    break;
                case 2:
                    this.messageText = 'Ya tienes un evento a las ' + this.hora;
                    //this.statusClass = 'occupied';
                    this.statusClass = 'blocked';
                    this.showHour = false;
                    //this.lugaresText = 'Haz click aquí para sustituirlo';
                    break;
                case 3:
                    this.messageText = 'Cupo máximo alcanzado';
                    this.statusClass = 'limit';
                    this.showExtra = false;
                    break;
                case 4:
                    this.statusClass = 'blocked';
                    break;
                //Taller seleccionado, horario bloqueado
                case 5:
                    this.messageText = 'Reservaciones cerradas';
                    this.statusClass = 'closed';
                    this.showExtra = false;
                    break;
            }
        },

        slotAction(s, index, id, ue) {
            //console.log(s,id)
            this.$emit("slotAction", s, index, id, ue)
        },

        Outdated(t) {
            this.currentDate = new Date()
            let checkDate = new Date(`${this.eventDate}T${$('#timeLimit' + this.id).html()}`)

            if (checkDate < this.currentDate) return true
            else return false
        },

        TraceEvent(description, user_id) {
            //this.emitter.emit('TraceClick', { 'id': id, 'user_id': user_id })
            if (description && user_id) {
                UserService.getEventLogTraceContent(description, user_id).then((response) => {
                
                }).catch(error => {
                    console.log('getTraceContentTimeSlot', error)
                })
            }
        }
    }
}
</script>

<style lang="scss">
.slot {
    border-top: var(--iris-color4) thin solid;
    border-bottom: var(--iris-color4) thin solid;
    padding: 10px;
    color: var(--iris-color4);
    margin-bottom: 20px;
    cursor: pointer;

    .message {
        font-weight: bold;
    }

    .hour {
        font-size: 20px;
        font-weight: bold;
        padding-top: 10px;
        border-right: var(--iris-color4) thin solid;
    }

    .image .image-container {
        width: 50px;
        height: 50px;
        //background-color: var(--iris-inactive1);
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
    }

    &.reserved {
        background-color: var(--iris-color4);
        color: white;

        .hour {
            border-right-color: white;
        }
    }

    &.reserved .message,
    &.limit .message,
    &.closed .message {
        padding-top: 12px;
    }

    &.limit,
    &.occupied {
        background-color: var(--iris-inactive2);
    }

    &.limit,
    &.blocked,
    &.closed {
        cursor: not-allowed;
    }

    &.limit .image .image-container,
    &.closed .image .image-container {
        background-color: var(--iris-inactive2);
        border: var(--iris-color4) thin solid;
    }

    &.blocked,
    &.closed {
        opacity: 0.5;
    }
}

.timeLimit {
    display: none;
}
</style>