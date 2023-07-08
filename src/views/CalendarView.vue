<template>
    <div class='demo-app'>
        <div class='demo-app-sidebar'>
            <div class='demo-app-sidebar-section'>
                <h2 class="eventos">Instructions</h2>
                <ul class="eventos">
                    <li>Select dates and you will be prompted to create a new event</li>
                    <li>Drag, drop, and resize events</li>
                    <li>Click an event to delete it</li>
                </ul>
            </div>
            <div class='demo-app-sidebar-section'>
                <label class="eventos">
                    <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle'  />
                    toggle weekends
                </label>
            </div>
            <div class='demo-app-sidebar-section'>
                <h2 class="eventos">Todos los Eventos ({{ currentEvents.length }})</h2>
                <ul>
                    <li v-for='event in currentEvents' :key='event.id'>
                        <b>{{ event.title }}</b>
                        <b>{{ event.start }}</b>
                    </li>
                </ul>
            </div>
        </div>
        <div class='demo-app-main'>
            <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
                <template v-slot:eventContent='arg'>
                        <b>{{ arg.title }}</b>
                        <i>{{ arg.event.title }}</i>
                </template>
            </FullCalendar>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import UserService from '../services/user.service'
import AuthService from "../services/auth-header"
import Moment from 'moment'

export default defineComponent({
    components: {
        FullCalendar,
    },
    data() {
        return {
            posts: [],
            events: [],
            calendarOptions: {
                toggleModal: false,
                modalActive: false,
                selectInfo: {},
                titleModal: '',
                locale: 'es',
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin // needed for dateClick
                ],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                initialView: 'dayGridMonth',
                eventSources: [
                    {
                        events: async function (fetchInfo, successCallback, failureCallback) {
                            await UserService.getEventContent().then((response) => {
                                let data = response.data.data.map(post => ({
                                    id: post.id,
                                    title: post.event_name,
                                    start: Moment(post.event_date_start).format('YYYY-MM-DD HH:mm'),
                                }))
                                successCallback(data)

                            }).catch(error => {
                                console.log('This Error eventSources', error);
                            })

                        }
                    }
                ],
                //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                //initialEvents: this.getDataEvents,
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                select: this.handleDateSelect,
                eventClick: this.handleEventClick,
                eventsSet: this.getDataEvents,
                //eventChange: this.getDataEvents
                /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
            },
            currentEvents: [],
            showEvents: [],
        }
    },
    mounted() {
    if (localStorage.getItem('token')) {
     AuthService()
   

    } else {
        this.$router.push('/')
    }

    },
    methods: {
        handleWeekendsToggle() {
            this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
        },
        handleDateSelect(selectInfo) {
           /* let title = prompt('Please enter a new title for your event')
            let calendarApi = selectInfo.view.calendar
            calendarApi.unselect() // clear date selection
            if (title) {
                calendarApi.addEvent({
                    id: createEventId(),
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay
                })
            }*/
        },
        handleEventClick(clickInfo) {
            /*if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
                clickInfo.event.remove()
            }*/
        },
        handleEvents(events) {
            this.currentEvents = events
        },
        async getDataEvents(events) {

            await UserService.getEventContent().then((response) => {

                this.showEvents = response.data.data.map(post => ({
                    id: post.id,
                    title: post.event_name,
                    start: Moment(post.event_date_start).format('YYYY-MM-DD HH:mm'),
                }))
                this.currentEvents = this.showEvents

            }).catch(error => {
                console.log('This Error getDataEventsTable', error);
            })
        },
    }
})
</script >


<style lang="scss">
h2 {
    margin: 0;
    font-size: 16px;
}

ul {
    margin: 0;
    padding: 0 0 0 1.5em;
}

li {
    margin: 1.5em 0;
    padding: 0;
}

b {
    /* used for event dates/times */
    margin-right: 3px;
}

.demo-app {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
}
/*.demo-app-sidebar {
    width: 300px;
    line-height: 1.5;
    background: #eaf9ff;
    border-right: 1px solid #d3e2e8;
}*/

.eventos {
    color: #FFFFFF;
}

.demo-app-sidebar {
  --bs-nav-link-padding-x: 0;
  --bs-nav-link-padding-y: 0.5rem;
  --bs-nav-link-font-weight: ;
  --bs-nav-link-color: var(--bs-navbar-color);
  --bs-nav-link-hover-color: var(--bs-navbar-hover-color);
  --bs-nav-link-disabled-color: var(--bs-navbar-disabled-color);
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  width: 300px;
  line-height: 1.5;
  background: linear-gradient(-45deg, var(--iris-color1), var(--iris-color2), var(--iris-color3), var(--iris-color4), var(--iris-color5), var(--iris-color2));
    background-size: 150% 380%;
    animation: gradient 30s ease infinite;
}

.demo-app-sidebar-section {
    padding: 2em;
}

.demo-app-main {
    flex-grow: 1;
    padding: 3em;
}

.fc {
    /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
}
</style>