<template>
  
    <div v-if="room" class="container main-view">
        <div class="row">

          <div class="col-12 col-md-7 p-0 px-md-3 left-column">
            <div class="head" :style="{ backgroundImage: `url(${ room.room.room_image})` }" >
              <h2>{{room.event_location}}</h2>
            </div>

            <div class="main-content">
              <h4>Sobre el lugar</h4>
              <p>{{room.event_description}}</p>
            </div>
          </div>

          <div class="col-12 col-md-5">
            <div class="main-content">
              <div class="eventdisplay">
                <h5>En este lugar podrás participar en el taller</h5>
                <h3>{{room.nombreEvento}}</h3>
                <div class="statistics">
                  <div class="graph">
                    <Percentage :stroke="10" :amount="parseInt(room.room.room_capacity - room.room.room_places_available_event)" :total="parseInt(room.room.room_capacity)" />
                  </div>
                  <div class="info">
                    {{lugaresDisplay}}
                  </div>
                </div>
                <RouterLink v-if="room.room_places_available_event > 0" :to="{path: createLink('taller', room.id_event, room.nombreEvento)}" exact>
                  <button class="btn-line">Inscribir el taller <i class="fa-solid fa-chevron-right"></i></button>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
    </div>
  <div  v-else>
    <Loading />
  </div>
  <MainFooter />
</template> 

<script>
import UserService from '../services/user.service'
import AuthService from "../services/auth-user"
import MainFooter from '@/components/MainFooter.vue'
import Loading from '@/components/Loading.vue'
import Percentage from '@/components/Percentage.vue'

export default {
  name: 'MapaView',
  components: {
    MainFooter, Loading, Percentage
  },
  data(){
    return{
      id: this.$route.params.id,
      user: this.userNumberSlot,
      section: 'mapa',
      room: null,
      percentage: null,
      lugaresDisplay: '',
      userIdMapDetaill: this.$store.state.id,
    }
  },
  mounted(){

    if (localStorage.getItem('token')) {
      AuthService()
      this.TraceEvent(`Map-Details-${this.section}-${this.id}`, this.userIdMapDetaill)
      this.loadJSON(this.id)
      document.title = 'Cargando taller'
    } else {
      this.$router.push('/')
    }    
  },
  methods:{

    async loadJSON(id) {
      
      await UserService.getRoomContent(id).then((response) => {
        this.room = response.data.data

      }).catch(error => {
        console.log('This Error loadJSON', error);
      })
    },
    createLink(page,id,name){
      let link = `/${page}/${id}/${name.replaceAll(' ','-')}`
      return link
    },

    randomNumber(min, max){
      return  Math.floor(Math.random() * max + min)
    },

    /*TraceEvent(id, user_id) {
        this.emitter.emit('TraceClick', {'id': id, 'user_id':user_id})
        this.eventLogTrace(id, user_id)
    },*/

    TraceEvent(description, user_id) {
      //this.emitter.emit('TraceClick-', { 'id': id, 'user': user })
      
      if (description && user_id) {
        UserService.getEventLogTraceContent(description, user_id).then((response) => {
         
        }).catch(error => {
          console.log('DetalleMapTraceContent', error)
        })
      }
    },

    Display(){
      if(this.room.room.room_places_available_event == 0) this.lugaresDisplay = 'Ya no hay lugares disponibles'
      else if (this.room.room.room_places_available_event == 1) this.lugaresDisplay = '¡Aún hay un lugar disponible!'
      else this.lugaresDisplay = `Hay ${this.room.room.room_places_available_event} lugares disponibles`
    }
  },
  watch: {
    room(){
      document.title = this.room.event_location
    }
  }
}
</script>

<style lang="scss">
.statistics{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;

  .graph{
    width: 100px;
  }

  .info{
    margin-left: 10px;
    font-weight: 700;
  }
}
</style>