<template>
  <div class="bg gradientBG border body">
      <div class="row justify-content-center">
          <!--img src="@/assets/Instagram_icon.png" alt="Iris StartUp Lab" style="max-width: 90px;"-->
          <h2 class="titleIris">
              @irisStartupLab</h2>
          <br>
      </div>
      <br>
      <br>
      <div class="row">
          <div class="container-xxl bd-gutter masthead-followup">
              <div class="row g-3 g-md-5 mb-5 pb-5 justify-content-center">
                  <div class="card mb-3" style="max-width: 540px;" v-for="(item, index) in data" @click="clickEvent" 
                           v-on:click="TraceEvent(`RedesView-${section}`, $store.state.id)">
                      <div class="row g-0">
                          <!--div class="col-md-4">
                              <img v-bind:src='item.url' class="bd-placeholder-img img-fluid" />
                              <img src="@/assets/2979410130736105395_55879872580.jpg" width="100%" height="250px"
                                  alt="Iris [Start Up Lab]" />
                          </div-->
                          <div class="col-md-8">
                              <div class="card-body">
                                  <h5 class="card-title"> {{ item.title }} {{ item.id }} </h5>
                                  <p class="card-text">{{ item.description }}</p>
                                  <p class="card-text"><small class="text-muted"> {{ item.datetime }}</small></p>

                              </div>
                          </div>
                          <div class="deco left"></div>
                          <div class="deco left"></div>
                      </div>
                  </div>

                  <div class="card mb-3" style="max-width: 540px;" v-for="(item, index) in resultMedia">
                      <div class="row g-4">
                          <!--div class="col-md-4">
                              <img src="@/assets/2979410130736105395_55879872580.jpg" width="100%" height="250px"
                                  alt="Iris [Start Up Lab]" />
                          </div-->
                          <div class="col-md-8">
                              <div class="card-body">
                                  <h5 class="card-title"> {{ item.title }} {{ item.id }} </h5>
                                  <p class="card-text">{{ item.description }}</p>
                                  <p class="card-text"><small class="text-muted"> {{ item.datetime }}</small></p>,
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="row">
      </div>
  </div>

  <Transition name="modal-info">
      <Modal @close="toggleModal" :modalActive="modalActive">
          <div class="row g-0">
              <div class="col-md-4">
                  asdf
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural
                          lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  </div>
              </div>
          </div>
      </Modal>
  </Transition>

</template>

<script>
import AuthService from '../services/auth-user'
import UserService from '../services/user.service'
import Modal from '@/components/Modal.vue'
import Loading from '@/components/Loading.vue'
import TimeSlot from '@/components/TimeSlot.vue'

export default {
  components: {
      Loading, Modal, TimeSlot
  },
  data() {
      return {
          section: 'RedesSociales',
          modalActive: false,
          allowClose: true,
          modalID: null,
          data: [
              {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 1
              }, {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 2
              }
              , {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 3
              }, {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 4

              }, {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 5
              }, {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 6
              }, {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 7
              }, {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 8
              }, {
                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqMK-xTc7sXzBiSHDbjdMR01OxWJ6juzbFw&usqp=CAU',
                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore blanditiis neque fuga? Omnis quis adipisci iste optio, illum laboriosam quo harum sint aliquid ipsum odio illo ut, earum tempore.',
                  profile: 'https://localhost:8080/',
                  title: 'Title',
                  datetime: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  id: 9
              }
          ],
          resultApi: [],
          resultMedia: []
      }

  },
  created() {
      /*
      axios.get("http://localhost:3000/feedIris").then((result) => {
          this.resultApi = result.data;
          this.resultMedia = result.data.data.recent.sections[0].layout_content.medias
      })
      */
  },
  mounted() {
    if (localStorage.getItem('token')) {
        AuthService()
    } else {
      this.$router.push('/')
    }

      /*
          var axios = require('axios');
          var config = {
          method: 'get',
          url: 'https://www.instagram.com/api/v1/tags/web_info/?tag_name=irisstartuplab',
          headers: { 
              'Cookie': 'csrftoken=5l8ONToBEBUy6da6BzH5fSmFYq9VZLRl; ds_user_id=9253137367; ig_did=620352C3-9335-4EB5-97F5-CC97762B5F30; mid=Y6YMDAAEAAHiFT6xVByZgL4Rv2lX; shbid="2217\\0549253137367\\0541703626754:01f7d842b4bc12e30d49b965d533e52a46b8d3f9bbc36c7eb7ab159a44205f932a7a689a"; shbts="1672090754\\0549253137367\\0541703626754:01f742dea4389c4ca35dfec28882510a8e2556666efe1de84fd7053e3d9a65c4b7c7e03b"'
          }
          };

          axios(config)
          .then(function (response) {
          console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
          console.log(error);
          });
      */
      //   console.log(this.resultApi)
  },
  methods: {
      clickEvent(hashtags) {
          this.allowClose = !this.allowClose

          if (this.allowClose) {
              this.modalActive = !this.modalActive
              if (!this.modalActive) {
                  this.modalID = null
                  clearTimeout(this.cancelTimeOut)
              }
          }

      },
      toggleModal() {
          this.allowClose = false
          this.modalActive = false
      },
       TraceEvent(description, user_id) {
      //this.emitter.emit('TraceClick', { 'id': id, 'user_id': user_id })

      if (description && user_id) {
        UserService.getEventLogTraceContent(description, user_id).then((response) => {
         
        }).catch(error => {
          console.log('getRedesViewLogTraceContent', error)
        })
      }
    }
  },
}
</script>

<style lang="scss">
.body {
  height: 100%;
  width: 100%;
}

.card {
  --bs-card-spacer-y: 1rem;
  --bs-card-spacer-x: 1rem;
  --bs-card-title-spacer-y: 0.5rem;
  --bs-card-border-width: 1px;
  --bs-card-border-color: var(--bs-border-color-translucent);
  --bs-card-border-radius: 0.375rem;
  --bs-card-box-shadow: ;
  --bs-card-inner-border-radius: calc(0.375rem - 1px);
  --bs-card-cap-padding-y: 0.5rem;
  --bs-card-cap-padding-x: 1rem;
  --bs-card-cap-bg: rgba(0, 0, 0, 0.03);
  --bs-card-cap-color: ;
  --bs-card-height: ;
  --bs-card-color: ;
  --bs-card-bg: #fff;
  --bs-card-img-overlay-padding: 1rem;
  --bs-card-group-margin: 0.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: var(--bs-card-height);
  word-wrap: break-word;
  background-color: #ffffffa1;
  background-clip: border-box;
  border: var(--bs-card-border-width) solid var(--bs-card-border-color);
  border-radius: 12px;
  margin: 10px 15px;
}

.titleIris {
  text-align: center;
  color: #fff;
  size: 39px;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}


.img-fluid {
  max-width: 100%;
  height: auto;
}

.rounded-start {
  border-bottom-left-radius: .25rem !important;
  border-top-left-radius: .25rem !important;
}

.g-0,
.gx-0 {
  --bs-gutter-x: 0;
}

.g-0,
.gy-0 {
  --bs-gutter-y: 0;
}

.bd-example {
  padding: 1.5rem;
  margin-right: 0;
  margin-left: 0;
  border-width: 1px;
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
}

.card.mb-3 {
  flex: 0 0 auto;
  width: 33.33333333%;

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
}
</style>


