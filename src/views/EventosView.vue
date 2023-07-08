<template>
  <Transition name="modal-info">
    <Modal @close="toggleModal" :modalActive="modalActive" class="message text-align-center">
      <h4>Bienvenidos a IriStartUp, solo puedes elegir 3 eventos</h4>
    </Modal>
  </Transition>
  <div class="container main-view">
    <div class="row">
      <div class="col-12 col-md-3 left-column">
        <div class="main-content">
          <h1 :style="{ color: `var(--iris-color${randomNumber(1, 7)}` }">
            <Tile :randomSpeed="false" />
            Talleres
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A atque magnam consequuntur corrupti labore
            tenetur architecto rem saepe recusandae adipisci accusantium voluptates alias necessitatibus expedita, sunt
            dolorem facere cumque sequi.</p>
        </div>
      </div>
      <div class="col-12 col-md-9">
        <div v-if="showEvents" class="main-content events">
          <div class="event_container" v-for="event in events" v-bind:key="event.id"
            @click="clickEvent(clickEventId = event.id)">
            <div class="event" :style="{ backgroundImage: `url(${event.event_image})` }">
              <h2>{{ event.event_name }}</h2>
              <div class="deco left"></div>
              <div class="deco right"></div>
              <div v-if="userEvents.includes(event.id)" class="check reserved">
                <div class="checkimg"></div>
              </div>
              <br><br><br><br>
              <RouterLink :to="{ path: createLink('taller', event.id, event.event_name) }"
                v-on:click="TraceEvent(`${'section-'+section}-${'evento-'+event.id}-${'id-'+event.author.id}`, $store.state.id)">
                <button class="btn-main ">Ver Detalle</button>
              </RouterLink>
            </div>
          </div>
          <Transition name="modal-info">
            <ModalEvent @close="toggleModalEvent" :modalEventActive="modalEventActive">
              <EventOne @slotEventAction="clickEvent" :idevent="this.clickEventId" />
            </ModalEvent>
          </Transition>
        </div>
        <div v-else>
          <Loading />
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script>
import UserService from '../services/user.service'
import AuthService from '../services/auth-user'
import MainFooter from '@/components/MainFooter.vue'
import Tile from '@/components/Tile.vue'
import ModalEvent from '@/components/ModalEvent.vue'
import Modal from '@/components/Modal.vue'
import Loading from '@/components/Loading.vue'
import EventOne from '@/components/EventOne.vue'

export default {
  name: 'EventosView',
  components: {
    MainFooter,
    Loading,
    Tile,
    ModalEvent,
    Modal,
    EventOne
  },
  data() {
    return {
      section: 'talleres',
      events: null,
      userEvents: [],
      showEvents: false,
      clickEventId: null,
      modalEventActive: false,
      allowClose: true,
      modalID: null,
      eventId: null,
      userId: this.$store.state.id,
      modalActive: true
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {

      AuthService()
      setTimeout(() => this.irisEvents(), 1000)
      setTimeout(() => this.irisRoom(), 1000)

    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async irisEvents() {
      await UserService.getEventContent().then((response) => {
        this.events = response.data.data
      }).catch(error => {
        console.log('This Error getEventContent', error);
      })

    },
    async irisRoom() {
      await UserService.getRoomUserContent(this.userId).then((response) => {
        this.userEvents = response.data.usuario.eventos
      }).catch(error => {
        console.log('This Error getRoomUserContent', error)
      })
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * max + min)
    },
    createLink(page, id, name) {
      let link = `${page}/${id}/${name.replaceAll(' ', '-')}`
      return link
    },
    TraceEvent(description, user_id) {
    
      if (description && user_id) {

        UserService.getEventLogTraceContent( description, user_id ).then((response) => {

          }).catch(error => {
            console.log('This Error EventsTraceContent', error);
          })
        }
      
      //this.emitter.emit('TraceClickEvent', { 'id': id, 'user_id': user_id })

    },
    clickEvent(id) {
      this.allowClose = !this.allowClose
      if (this.allowClose) {
        this.modalEventActive = !this.modalEventActive
        if (!this.modalEventActive) {
          this.modalID = null
          clearTimeout(this.cancelTimeOut)
        }
      }
    },
    toggleModalEvent() {
      this.allowClose = false
      this.modalEventActive = false
    },
    toggleModal() {
      this.allowClose = false
      this.modalActive = false
    },
  },
  watch: {
    events() {
      if (this.events.length > 0) this.showEvents = true
      setTimeout(() => this.irisEvents(), 1000)
      setTimeout(() => this.irisRoom(), 1000)
    }
  }

}
</script>

<style lang="scss">
.events {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .event_container {
    width: 100%;
    height: 230px;
    //height: 398px;
    margin: 10px 5px;
  }

  .event {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;

    background: {
      position: center;
      repeat: no-repeat;
      size: cover;
    }

    border: {
      top-left-radius: 10px;
      bottom-right-radius: 10px;
    }

    h2 {
      padding: 15px;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      display: inline-block;
      font-weight: normal;
    }

    .deco {
      background: {
        image: url('@/assets/layout/corchete01.svg');
        position: center;
        size: contain;
      }

      width: 18px;
      height: 18px;
      position: absolute;
      z-index: 99;

      &.left {
        top: 0;
        left: 0;
      }

      &.right {
        bottom: 0;
        right: 0;
        transform: rotate(180deg);
      }
    }

    .check {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: var(--iris-color4);
      transform: translate(30%, 30%);
      z-index: 100;
    }

  }
}

@media only screen and (min-width: 768px) {

  .events {
    .event_container {
      width: calc((100% / 3) - 10px);
      margin: 5px;
    }
  }
}

/* Para 480px */
@media only screen and (max-width: 500px) and (min-width: 341px) {
  .modalContent {
    width: 99%;
  }

  .image {
    width: 30%;
  }

  .hour {
    width: 70%;
  }

  .info {
    width: 100%;
  }
}

/* Para 320px */
@media only screen and (max-width: 340px) and (min-width: 5px) {

  .modalContent {
    width: 99%;
  }

  .image {
    width: 30%;
  }

  .hour {
    width: 70%;
  }

  .info {
    width: 100%;
  }

}
</style>