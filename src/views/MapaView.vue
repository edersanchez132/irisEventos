<template>
  <div class="container main-view">
    <div class="row">
      <div class="col-md-4 left-column">
        <div class="main-content">
          <h1 :style="{ color: `var(--iris-color${randomNumber(1, 7)}` }">
            <Tile :randomSpeed="false" />
            Mapa
          </h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea repellendus nihil nulla, deserunt voluptas nemo
          nobis nisi eum, ipsa labore deleniti asperiores perspiciatis dignissimos, tempore fugit cumque repudiandae?
          Atque, in.
        </div>
      </div>
      <div class="col-md-8">
        <div class="main-content">
          <div id="map">
            <figure id="projectsvg">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 930 930" preserveAspectRatio="xMinYMin meet">
                <image width="100%" height="100%" xlink:href="@/assets/map/mapBase.svg">
                </image>
                <g v-for="map, index in maps" class="hover_g" opacity="0">
                  <RouterLink :to="{ path: createLink('mapa', map.id, map.name) }"
                    v-on:click="TraceEvent(`${section}-${map.id}`, $store.state.id)">
                    <rect v-if="map.rect" :x="map.rect.x" :y="map.rect.y" :fill="map.fill" :width="map.rect.w"
                      :height="map.rect.h"></rect>
                    <polygon v-if="map.poly" :fill="map.fill" :points="map.poly" />
                    <image v-if="map.image" :width="map.image.w" :height="map.image.h" :x="map.image.x" :y="map.image.y"
                      :xlink:href="require(`@/assets/map/` + map.image.name)"></image>
                  </RouterLink>
                </g>
                <image width="100%" height="100%" xlink:href="@/assets/map/mapLines.svg" style="pointer-events: none">
                </image>
                <image class="numbers" width="100%" height="100%" xlink:href="@/assets/map/mapNumbers.svg"
                  style="pointer-events: none"></image>
                <image class="names" width="100%" height="100%" xlink:href="@/assets/map/mapNames.svg"
                  style="pointer-events: none"></image>
              </svg>
            </figure>
          </div>
          <div id="mapList">
            <ul>
              <li v-for="map, index in maps">
                <RouterLink :to="{ path: createLink('mapa', map.id, map.name) }"
                  v-on:click="TraceEvent(`${section}-${map.id}`, $store.state.id)">
                  <div class="number iris" :class="classFormat(index)">{{ roman(map.id) }}</div>
                  <div class="name">{{ map.name }}</div>
                </RouterLink>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">

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

export default {
  name: 'MapaView',
  components: {
    MainFooter, Tile
  },
  data() {
    return {
      section: 'Mapa Principal',
      userMap: '',
      userId: this.$store.state.id,
      userName: this.$store.state.name,
      maps: [
        {
          id: 100,
          name: 'Laboratorio Génesis 1',
          poly: null,
          rect: {
            x: 85.5,
            y: 144,
            w: 117,
            h: 189.6
          },
          image: null,
          fill: 'var(--iris-color1)'
        },
        {
          id: 103,
          name: 'Laboratorio Génesis 2',
          poly: null,
          rect: {
            x: 85.5,
            y: 358.9,
            w: 117,
            h: 189.6
          },
          image: null,
          fill: 'var(--iris-color2)'
        },
        {
          id: 106,
          name: 'Laboratorio Génesis 3',
          poly: null,
          rect: {
            x: 85.5,
            y: 572.9,
            w: 117,
            h: 189.6
          },
          image: null,
          fill: 'var(--iris-color3)'
        },
        {
          id: 109,
          name: 'Esquina Alfa',
          poly: '623,42.5 737.5,42.5 840.5,124.5 623.5,124.5',
          rect: null,
          image: null,
          fill: 'var(--iris-color4)'
        },
        {
          id: 112,
          name: 'Punto ATP',
          poly: null,
          rect: {
            x: 671.5,
            y: 144.5,
            w: 215,
            h: 168
          },
          image: null,
          fill: 'var(--iris-color5)'
        },
        {
          id: 115,
          name: 'Nido',
          poly: null,
          rect: null,
          image: {
            name: `fill6.svg`,
            x: 805.5,
            y: 359.7,
            w: 82,
            h: 99.8
          }
        },
        {
          id: 118,
          name: 'Rincón Micelium',
          poly: '675.5,633.5 886.5,633.5 886.5,799.7 813.8,884.5 675.5,884.5',
          rect: null,
          image: null,
          fill: 'var(--iris-color7)'
        },
        {
          id: 121,
          name: 'Visionarium',
          poly: null,
          rect: {
            x: 322.5,
            y: 786.5,
            w: 292,
            h: 98
          },
          image: null,
          fill: 'var(--iris-color8)'
        },
        {
          id: 124,
          name: '300k',
          poly: null,
          rect: null,
          image: {
            name: `fill9.svg`,
            x: 229,
            y: 664,
            w: 80,
            h: 36
          }
        }
      ]
    }
  },
  mounted() {

    if (localStorage.getItem('token')) {
        //this.jsonIdEventSlot()
        AuthService()
      $('#mapDrop').change(function () {
        let id = $('#mapDrop').val()
        //console.log(id)
        $('.zone').addClass('hidden')
        $('#map' + id).removeClass('hidden')
      })
    } else {
      this.$router.push('/')
    }

  },
  methods: {
    randomNumber(min, max) {
      return Math.floor(Math.random() * max + min)
    },
    TraceEvent(description, user_id) {
      //this.emitter.emit('TraceClick', { 'id': id, 'user_id': user_id })

      if (description && user_id) {
        UserService.getEventLogTraceContent(description, user_id).then((response) => {
         
        }).catch(error => {
          console.log('getMapaViewLogTraceContent', error)
        })
      }
    },
    createLink(page, id, name) {
      let link = `${page}/${id}/${name.replaceAll(' ', '-')}`
      return link
    },
    roman(n) {
      let r;
      switch (n) {
        case 1: n = 'I'; break
        case 2: n = 'II'; break
        case 3: n = 'III'; break
        case 4: n = 'IV'; break
        case 5: n = 'V'; break
        case 6: n = 'VI'; break
        case 7: n = 'VII'; break
        case 8: n = 'VIII'; break
        case 9: n = 'IX'; break
      }
      return n
    },
    classFormat(i) {
      return 'f' + i
    }
  },
}
</script>

<style lang="scss">
#map {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  .names {
    display: none;
  }

  .hover_g {
    opacity: 1;
  }
}

#mapList {
  li {
    margin: 10px 0;
    list-style: none;
    width: 100%;
    border-top: black thin solid;
    border-bottom: black thin solid;

    a {
      text-decoration: none;
      display: flex;
      width: 100%;
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
      color: var(--mainFont-color);

      .number {
        width: 40px;
        height: 40px;
        padding-top: 8px;
        border-radius: 50%;
        text-align: center;
        margin-right: 10px;
      }

      .name {
        padding-top: 8px;
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  #map {
    .names {
      display: block;
    }

    .numbers {
      display: none;
    }

    .hover_g {
      opacity: 0;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }

  #mapList {
    display: none;

    li {
      display: flex;
    }
  }
}
</style>