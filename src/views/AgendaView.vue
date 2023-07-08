<template>
  <div class="container main-view">
    <div class="row">
      <div class="col-md-5 left-column">
        <div class="main-content">
          <h1 :style="{ color: `var(--iris-color${randomNumber(1, 7)}` }">
            <Tile :randomSpeed="false" />
            Mi Agenda
          </h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea repellendus nihil nulla, deserunt voluptas nemo
          nobis nisi eum, ipsa labore deleniti asperiores perspiciatis dignissimos, tempore fugit cumque repudiandae?
          Atque, in.
        </div>
      </div>
      <div class="col-md-7">
        <div class="main-content">

          <div v-if="agenda" id="agenda">
            <div class="line"></div>
            <div class="tile top c0"><img src="@/assets/tiles/tile0.svg"></div>
            <div class="tile bottom c2"><img src="@/assets/tiles/tile4.svg"></div>
            <div class="date">
              <SwitchDate :date="this.eventStart" />
            </div>

            <div class="item-container">
              <div v-for="slot, index in agenda">
                <AgendaSlot :slot="slot" :index="index" />
              </div>
            </div>

          </div>

          <div v-else>
            <Loading />
          </div>

        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script>
import MainFooter from '@/components/MainFooter.vue'
import Tile from '@/components/Tile.vue'
import Loading from '@/components/Loading.vue'
import AgendaSlot from '@/components/AgendaSlot.vue'
import SwitchDate from '@/components/SwitchDate.vue'
import axios from 'axios'

export default {
  name: 'AgendaView',
  components: {
    MainFooter, Tile, Loading, AgendaSlot, SwitchDate
  },
  data() {
    return {
      section: 'agenda',
      agenda: null,
      userEvents: null,
      events: null,
      currentDate: null,

      refreshTime: 5000,
      interval: null,
      userIdAgenda: this.$store.state.id
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.userDiary()
    } else {
      this.$router.push('/')
    }
    this.TraceEvent(this.section, this.userIdAgenda)
  },
  unmounted() {
    clearInterval(this.interval)
  },
  methods: {
    userDiary: async function () {
      try {
        const setting = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          }
        }
        const url = this.baseURL+'/room/roomUser/' + this.userIdAgenda
        let data = await fetch(url, setting)
        let json = await data.json()
        this.userEvents = json.usuario.eventos
        this.getEvents()
      } catch (error) {
        console.log('This Error in jsonURLuser', error)
      }
    },

    getEvents: async function () {
      try {
        const setting = {
          method: 'GET',
        }
        const url = this.baseURL+'/events'
        let data = await fetch(url, setting)
        let json = await data.json()
        this.events = json.data

        this.createSlots()
        this.interval = setInterval(() => { this.createSlots() }, this.refreshTime)
      } catch (error) {
        console.log(error)
      }
    },

    randomNumber(min, max) {
      return Math.floor(Math.random() * max + min)
    },

    TraceEvent(id, user_id) {
      this.emitter.emit('TraceClick', { 'id': id, 'user_id': user_id })
      this.eventLogTrace(id, user_id)
    },
    eventLogTrace: async function (id, user_id) {
      try {

        const payload = {
          description: id,
          user_id: user_id
        }

        const url = this.baseURL + '/traces';
        const data = await axios.post(url, payload)
        //console.log('response', data);
      } catch (error) {
        console.log('This Error eventLogTrace', error)
      }
    },
    createLink(page, id, name) {
      let link = `/${page}/${id}/${name.replaceAll(' ', '-')}`
      return link
    },
    createSlots() {
      //console.log('Create')
      this.agenda = [
        {
          type: 'general',
          title: 'Bienvenida',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, esse maxime, similique enim laudantium facilis id eum.',
          hour: 1001,
        },
      ]

      let i = 0

      this.userEvents.forEach(event => {
        let c_event
        if (event != 0) {
          c_event = this.events.find(x => x.id == event)
          this.agenda.push(
            {
              type: 'ev',
              img: c_event.event_image,
              link: this.createLink('taller', c_event.id, c_event.event_name),
              title: c_event.event_name,
              desc: c_event.event_location,
              hour: i,
            }
          )
        }
        else {
          this.agenda.push(
            {
              type: '',
              img: 'tiles/tile-default.svg',
              link: '/talleres',
              title: '[No tienes taller reservado]',
              desc: 'Haz click aquí para ver los talleres disponibles',
              hour: i,
            }
          )
        }
        i++

      });

      this.agenda.push(
        {
          type: 'general',
          title: 'Cierre',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, esse maxime, similique enim laudantium facilis id eum.',
          hour: 1002,
        },
      )
    },
  }
}
</script>

<style lang="scss">
#agenda {

  position: relative;
  padding-bottom: 40px;

  .line {
    width: 5px;
    height: calc(100% - 80px);
    top: 40px;
    left: 27.5px;
    position: absolute;
    background-color: black;
    z-index: 90;
    background: linear-gradient(-45deg,
        var(--iris-color3),
        var(--iris-color2),
        var(--iris-color1));
  }

  .tile {
    width: 40px;
    position: absolute;
    left: 10px;
    z-index: 95;

    &.bottom {
      bottom: 0;
    }
  }

  .date {
    font-size: 20px;
    margin-bottom: 20px;
    margin-left: 80px;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  .item {

    display: flex;
    margin-bottom: 20px;

    .time {
      font-size: 21px;
      font-weight: bold;
      margin-top: 10px;
      text-align: center;
      width: 60px;
      z-index: 100;

      span {
        background-color: white;
      }
    }

    .content {
      margin-left: 20px;
      width: 100%;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      border-top: thin solid #999;
      border-bottom: thin solid #999;

      .link {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 200;
      }

      .img {
        display: none;
      }

      .info {
        flex-grow: 1;

        .title {
          font-weight: bold;
          font-size: 20px;
          color: var(--iris-color4);
        }
      }

      .arrow {
        padding: 0 10px;
      }
    }


    &.outdated {
      .content {
        border: none;
        background-color: #CCC;

        .title {
          color: var(--mainFont-color)
        }
      }
    }


    &.general {
      color: var(--iris-color4);

      .content {
        border-color: var(--iris-color4);

        .text {
          color: var(--mainFont-color);
        }
      }

      &.outdated {
        .content {
          background-color: var(--iris-color4);
          color: white !important;

          .title,
          .text {
            color: white;
          }
        }
      }
    }

    &.ev {

      .content {
        border-color: var(--iris-color2);

        .title {
          color: var(--iris-color2);
        }

        .text {
          color: var(--mainFont-color);
        }
      }

      &.outdated {
        .content {
          background-color: var(--iris-color2);
          color: white !important;

          .title,
          .text {
            color: white !important;
          }

          .arrow {
            display: none;
          }
        }
      }
    }

    &.hidden {
      display: none !important;
    }
  }
}

@media only screen and (min-width: 768px) {
  #agenda {
    .item {
      .content {

        .img {
          width: 80px;
          height: 100%;
          margin-right: 20px;
          display: flex;
          align-items: center;

          .img-container {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-position: center;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>