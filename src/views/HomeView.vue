<template>

  <div class="wrapper">
    <div v-for="img, index in images" id="img-container">
      <div class="img-item" :id="'img'+index" :class="index ? 'hidden' : 'active'" :style="{backgroundImage:`url(${require('@/assets/layout/home/'+img)})`}"></div>
    </div>
  </div>
  <div class="container onTop p-0">
      <div class="row p-0">
        <div class="col-md-5 title-column">
          <div class="title-container">
            <div class="logo gradientBG">
              <img src="@/assets/iris-logo-cutout.svg" alt="Iris StartUp Lab">
            </div>
            <div class="menu">
              <div class="option">
                <router-link class="nav-link" :to="{ name: 'eventos' }"  v-on:click="TraceEvent(`${'section-'+section+'-eventos-'+$store.state.name}`, $store.state.id)">Talleres <Tile :randomSpeed="false" /></router-link>
              </div>
              <div class="option">
                <router-link class="nav-link" :to="{ name: 'agenda' }" v-on:click="TraceEvent(`${'section-'+section+'-agenda-'+$store.state.name}`, $store.state.id)">Mi agenda <Tile :randomSpeed="false" /></router-link>
              </div>
              <div class="option">
                <router-link class="nav-link" :to="{ name: 'mapa' }" v-on:click="TraceEvent(`${'section-'+section+'-mapa-'+$store.state.name}`, $store.state.id)">Mapa <Tile :randomSpeed="false" /></router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7 info-home-container">
          <div class="info-home iris" >
            <h1>Evento de lanzamiento</h1>
            <div class="desc">Sint aliqua minim ex sit ea consequat reprehenderit elit et aliquip. Pariatur commodo proident ex incididunt ipsum voluptate dolore proident. In cillum sit quis nulla aute irure. Irure adipisicing ipsum ut veniam qui cupidatat non est tempor duis incididunt Lorem mollit enim.</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import authHeader from '../services/auth-user'
import UserService from '../services/user.service'
import Tile from '@/components/Tile.vue'

export default {
  name: 'HomeView',
  components: {
    Tile
  },
  data(){
    return{
      section: 'Home',
      userId: this.$store.state.id,
      userName: this.$store.state.name,
      images: [
        'home0.jpg',
        'home1.jpg',
        'home2.jpg',
      ],
      count: 0,
      index: 1,
      interval: null
    }
  },
  mounted(){
    if (localStorage.getItem('token')) {
      authHeader()
    } else {
      this.$router.push('/')
    }

    this.emitter.emit('TraceClick', { 'id': this.userId, 'user': this.userName })
   
    this.count = this.images.length
    this.currentClass();
    this.interval = setInterval(() => {
      $('.img-item').addClass('hidden')
      $('#img' + this.index).removeClass('hidden')
      this.index++
      if (this.index >= this.count) this.index = 0
    },4000)
  },
  unmounted(){
    clearInterval(this.interval)
  },
  methods:{
    currentClass(){
      return 'f' + (Math.floor(Math.random()*8))
    },
    TraceEvent(description, user_id) {

      if (description && user_id) {

        UserService.getEventLogTraceContent( description, user_id ).then((response) => {
    
          }).catch(error => {
            console.log('This Error HomeViewTraceContent', error);
          })
      }
    },
  }
}
</script>

<style lang="scss">
  $colWidth: 250px;

  .wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 10;

    #img-container{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      .img-item{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        transition: opacity 1s ease;

        &.hidden{
          opacity: 0;
        }
      }
    }
  }

  .onTop{
    z-index: 50;
    position: relative;
    min-height: 100vh;

    .row{
      min-height: 100vh;
    }

    .title-container{

      width: 50%;
      padding: 10px;
      margin: 0;
      background-color: white;

      .logo{
        margin: 20px;
        padding-top: 0 !important;
      }

      .menu{

        .option{
          font-size: 16px;
          text-align: right;
          border-bottom: thin solid;
          border-color: var(--iris-color3);

          a{
            padding: 20px;
            color: var(--iris-color3);

            .tileImg{
              width: 20px;
              margin-left: 10px;
            }
          }

          &:first-child{
            border-top: thin solid;
            border-color: var(--iris-color3);
          }
        }
      }
    }
  }

  .info-home{
    margin: 20px;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background-color: rgba(0,0,0,0.8);
    color: white !important;
  }









  @media only screen and (min-width: 768px) {
    .wrapper{
      width: calc((100% / 12) * 7);
    }

    .onTop{
      .title-column{

        display: flex;
        align-items: center;
        justify-content: end;

        .title-container{
          width: 100%;
          max-width: 300px;
          padding: 0;
        }
      }
    }

    .info-home-container{
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .info-home{
        max-width: 60%;
        padding-left: 20px;
      }
    }
    
  }
</style>
