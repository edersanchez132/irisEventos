<template>
  <!-- <GoBack /> -->
  <div v-if="event">
    <div class="row">
      <div class="col-12 col-md-12 col-sm-12 p-0">
        <div class="main-content" v-show="show" :key="componentEventUserOne">
          <h2>{{ event.nombre }}</h2>
          <h3>Reserva tu espacio</h3>
          <div id="slots" v-for="slot, index in slots" v-bind:key="index">
            <TimeSlot @slotAction="clickEvent" :index="index" :id="slot.id_room" :lugares="slot.disponibles"
              :capacidad="(event.capacidad / 3)" :hora="slot.hora" :eventID="id" :section="section"
              :store="$store.state.id" />
          </div>
          <div class="places text-align-center">
            <h3> {{ updateLugares(event.lugares) }} </h3>
          </div>
        </div>
      </div>
    </div>
    <Transition name="modal-info">
      <Modal @close="toggleModalEvent" :modalActive="modalActive">
        <div v-if="modalID == 0">
          <div v-if="eventInfo">
            <h5>Confirma tu reservación para</h5>
            <h2 class="big">{{ event.nombre }}</h2>
            <Loading v-if="isLoading" />
            <div class="buttons" v-if="isButton">
              <button class="btn-sec btn-circle" @click="toggleModalEvent"
                v-on:click="TraceEvent(`Detalle-One-Modal-Event-${section}-${id}-${eventInfo.id}-6`, $store.state.id)">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <button class="btn-main btn-circle"
                @click="confirmEvent($store.state.id, eventInfo.id_room, event.id, event.lugares, event.nombre, roomIdHora, roomPlaces)"
                v-on:click="TraceEvent(`Detalle-One-confirm-Event-${section}-${id}-${eventInfo.id_room}-5`, $store.state.id)">
                <i class="fa-solid fa-check"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-if="modalID == 1">
          <div v-if="serverUpdated">
            <h5>Tu taller</h5>
            <h2 class="big">{{ event.nombre }}</h2>
            <h5>está reservado</h5>
            <ul class="details">
              <li>{{ roomIdHora }} <i class="fa-regular fa-clock"></i></li>
              <li>{{ event.ubicacion }} <i class="fa-solid fa-location-dot"></i></li>
            </ul>
            <Loading v-if="isLoading" />
            <div class="buttons">
              <RouterLink :to="{ name: 'agenda' }"
                v-on:click="TraceEvent(`Event-One-Reserva-Agenda-${section}-${id}-${eventDetail.id}-10`, $store.state.id)">
                <button class="btn-main">Ir a mi agenda</button>
              </RouterLink> <br>
              <button @click="modalID = 2"
                v-on:click="TraceEvent(`Event-One-Modal-ID-${section}-${id}-${eventDetail.id}-7`, $store.state.id)"
                class="btn-sec" v-if="isConfirmOne">
                Cancelar reservación
              </button>
            </div>
          </div>
          <div v-else>
            <Loading />
          </div>
        </div>
        <div v-if="modalID == 2">
          <h5>Confirma que quieres cancelar tu reservación a</h5>
          <h2>{{ roomName }}</h2>
          <Loading v-if="isLoading" />
          <div class="buttons" v-if="isButton">
            <button class="btn-sec btn-circle" @click="toggleModalEvent"
              v-on:click="TraceEvent(`Event-One-Confirmar-Event-${section}-${id}-${eventDetail.id}-8`, $store.state.id)">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="btn-main btn-circle" @click="confirmCancel($store.state.id, eventDetail)"
              v-on:click="TraceEvent(`Event-One-confirm-Cancel-${section}-${id}-${eventDetail.id}-9`, $store.state.id)">
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
        <div v-if="modalID == 3">
          <div v-if="serverUpdated">
            <h5>Tu reserva a</h5>
            <h2 class="big">{{ event.nombre }}</h2>
            <h5>está cancelada</h5>
            <Loading v-if="isLoading" />
            <div class="buttons">
              <RouterLink :to="{ name: 'agenda' }"
                v-on:click="TraceEvent(`Event-One-Reserva-Agenda-${section}-${id}-${eventDetail.id}-12`, $store.state.id)">
                <button class="btn-main">Ir a mi agenda</button>
              </RouterLink> <br>
            </div>
          </div>
          <div v-else>
            <Loading />
          </div>
        </div>
      </Modal>
    </Transition>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>
  
<script>
import UserService from '../services/user.service'
import TimeSlot from '@/components/TimeSlot.vue'
import Modal from '@/components/Modal.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'EventOne',
  components: {
    TimeSlot, Loading, Modal
  },

  created() {
    //this.saveUsers();
  },
  data() {
    return {
      section: 'talleres',
      id: this.idevent,
      userIdDetail: this.$store.state.id,
      event: null,
      slots: null,
      slotstime: null,
      roomPlaces: null,
      roomName: null,
      modalActive: false,
      modalID: null,
      roomIdHora: null,
      eventInfo: null,
      eventInfoId: null,
      eventDetail: null,
      slotsName: null,
      allowClose: true,
      cancelTimeOut: null,
      serverUpdated: false,
      creatingEvent: false,
      show: true,
      isLoading: false,
      isButton: true,
      modalEvent: this.modalEventActive,
      isConfirmOne: true,
      userId: this.$store.state.id,
      userName: this.$store.state.name,
      userEmail: this.$store.state.email,
    }
  },
  props: ['idevent'],
  mounted() {
    if (localStorage.getItem('token')) {
      //new Promise(resolve => this.loadJSON(resolve, 5000));
      setTimeout(() => this.loadJSON(), 1000)
      this.updateLugares()
      document.title = 'Cargando taller'
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async loadJSON() {

      await UserService.getLoadJSONContent(this.id).then((response) => {
        this.events = response.data.data
        this.event = response.data.eventos
        this.slots = response.data.eventos.talleres
        this.slotsTime = response.data.eventos.talleres.hora
      }).catch(error => {
        console.log('This Error getLoadJSONContent', error);
      })
    },
    updateLugares(e) {
      let m = ''
      if (e == 0) m = 'Ya no hay lugares disponibles :('
      else if (e == 1) m = '¡Último lugar disponible!'
      else m = e + ' lugares disponibles'
      return m
    },
    //------------------------------------------------ Click Event
    clickEvent(a, eventIndex, id, ev) {

      if (a == 0) {
        this.modalID = a
        this.getEventInfo(eventIndex)
        this.creatingEvent = true
        this.roomIdHora = this.event.talleres[eventIndex].hora
        this.roomPlaces = this.event.talleres[eventIndex].disponibles
        this.roomName = this.event.talleres[eventIndex].name_room
      }

      if (a == 1) {
        this.modalID = 1
        if (!this.creatingEvent) {
          this.eventDetail = {
            id: id,
            evento: this.event.nombre,
            hora: this.event.talleres[eventIndex].hora,
            lugares_room: this.event.talleres[eventIndex].disponibles,
            ubicacion: this.event.ubicacion,
            evento_id_romm: this.event.id,
            lugares_event: this.event.lugares,
            id_event_user: ev,
          }
          this.serverUpdated = true
          this.creatingEvent = false
        }
      }

      if (a == 2) {
        this.modalID = 1
        this.loadExternalEvent(id)
      }

      if (a != 4) this.toggleModalEvent()
    },

    toggleModalEvent() {
      if (this.allowClose) {
        this.modalActive = !this.modalActive
        if (!this.modalActive) {
          this.modalID = null
          clearTimeout(this.cancelTimeOut)
        }
      }
    },
    getEventInfo(index) {
      this.eventInfo = this.slots[index]
    },
    async confirmEvent(userNumberDetaill, tallerid, eventid, lugares, nombre, hora, places) {

      this.isLoading = true
      this.isButton = false
      this.isConfirmOne = false

      await UserService.ConfirmEventContent(userNumberDetaill, tallerid, eventid, lugares, nombre, hora, places).then((response) => {

        this.serverUpdated = false
        this.modalID = 1
        this.allowClose = false

        const responsEvent = {
          status: 1,
          id: response.data.message.id,
          evento: response.data.message.evento,
          taller: response.data.message.taller,
          horario: response.data.message.horario,
          ubicacion: response.data.message.ubicacion,
          user: this.userName,
          email: this.userEmail,
          fechaCreacion: response.data.message.fecha_creacion,
          notification: '!!Excelente¡¡ reservaste tu evento'
        }

        this.TraceEvent(`Event-One-Reserva-Confirm-Event-${tallerid}`, this.userId)
        this.receiveEvent(responsEvent)
        this.componentEventUserOne += 1;

        this.notificationEmail(responsEvent)

      }).catch(error => {
        console.log('This Error confirmEvent', error);
      })
    },
    async confirmCancel(userNumberDetaill, eventDetail) {

      this.isLoading = true;
      this.isButton = false;

      await UserService.ConfirmCancelContent(userNumberDetaill, eventDetail).then((response) => {

        this.serverUpdated = false;
        this.modalID = 3
        this.allowClose = false

        const responseCancel = {
          status: 2,
          id: response.data.message.id,
          evento: response.data.message.evento,
          taller: response.data.message.taller,
          horario: response.data.message.horario,
          ubicacion: response.data.message.ubicacion,
          user: this.userName,
          email: this.userEmail,
          fechaCreacion: response.data.message.fecha_creacion,
          notification: 'Ups! Cancelaste tu Evento'
        }

        this.TraceEvent(`Event-One-Cancelacion-${eventDetail.id}`, this.userId)
        this.receiveEvent(responseCancel)
        this.componentEventUserOne += 1;

        this.notificationEmail(responseCancel)

      }).catch(error => {
        console.log('This Error confirmCancel', error.message);
      })
    },
    receiveEvent(r) {
      this.serverUpdated = true
      setTimeout(() => this.loadJSON(), 1000)
      this.allowClose = true
      this.isLoading = true
      if (r.status == 1) {
        //this.show = false
        this.isLoading = false
        this.eventDetail = {
          id: r.taller,
          evento: r.evento,
          hora: r.horario,
          ubicacion: r.ubicacion
        }
      }
      else if (r.status == 2) {
        //this.show = false
        this.isLoading = false
        this.eventDetail = {
          id: r.taller,
          evento: r.evento
        }
      }
    },
    async loadExternalEvent(id) {

      await UserService.LoadExternalEvent(id).then((response) => {

        this.eventDetail = {
          id: response.data.id,
          evento: response.data.nombreEvento,
          hora: response.data.hora,
          ubicacion: response.data.ubicacion
        }
        this.serverUpdated = true

      }).catch(error => {
        console.log('This Error loadExternalEvent', error);
      })
    },
    createLink(page, id, name) {
      let link = `/${page}/${id}/${name.replaceAll(' ', '-')}`
      return link
    },
    TraceEvent(description, user_id) {
      //this.emitter.emit('TraceClick-', { 'id': id, 'user': user })

      if (description && user_id) {
        UserService.getEventLogTraceContent(description, user_id).then((response) => {

        }).catch(error => {
          console.log('getEventOneLogTraceContent', error)
        })
      }
    },
    logIn() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 5000);
    },
    async notificationEmail(responsEvent) {

      await UserService.NotificationUser(responsEvent).then((response) => {
        
      })
        .catch((error) => {
          console.log(error);
        });

    }
  },

  watch: {
    event() {
      document.title = this.event.nombre
      this.isButton = true
      //this.isConfirmOne = true
    }
  }
}
</script>
  
<style lang="scss">
.slots {
  margin: 0 20px;
}
</style>