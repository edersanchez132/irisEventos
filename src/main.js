import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { createApp } from 'vue'
import mitt from 'mitt'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import storage from './storage'
//axios.defaults.baseURL = 'http://localhost:8000/api/v1'

const emitter = mitt()
let app = createApp(App)

const eventInfo = {
     startDate: '2022-12-09',
     endDate: '2022-12-09',
     startTime: '19:00',
     endTime: '20:28'
}

app.config.globalProperties.baseURL = 'http://3.82.138.22/api-event-iris/public/api/v1'
app.config.globalProperties.emitter = emitter
app.config.globalProperties.eventDate = new Date(eventInfo.startDate)
app.config.globalProperties.eventDateString = eventInfo.startDate
app.config.globalProperties.eventStart = new Date(`${eventInfo.startDate}T${eventInfo.startTime}`)
app.config.globalProperties.eventFinish = new Date(`${eventInfo.startDate}T${eventInfo.endTime}`)
//const token = localStorage.getItem('token');

app.use(router).use(storage).mount('#app')

import 'bootstrap/dist/js/bootstrap.js'

