import { createRouter, createWebHistory } from 'vue-router'
//import { Role } from '@/_helpers';
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import EventosView from '../views/EventosView.vue'
import DetalleEventoView from '../views/DetalleEventoView.vue'
import AgendaView from '../views/AgendaView.vue'
import MapaView from '../views/MapaView.vue'
import DetalleMapaView from '../views/DetalleMapaView.vue'
import RedesView from '../views/RedesView.vue'
import CalendarView from '../views/CalendarView.vue'

import administradorView from '../views/Administrador/inicio.vue'
import adminUsuariosView from '../components/Administrador/Usuarios.vue'
import adminEventosView from '../components/Administrador/IrisEvents.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/talleres',
    name: 'eventos',
    component: EventosView,
    meta: {
      title: 'Talleres'
    }
  },
  {
    path: '/taller/:id/:name',
    name: 'evento',
    component: DetalleEventoView,
    meta: {
      title: 'Taller'
    }
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: AgendaView,
    meta: {
      title: 'Mi Agenda'
    }
  },
  {
    path: '/mapa',
    name: 'mapa',
    component: MapaView,
    meta: {
      title: 'Mapa'
    }
  },
  {
    path: '/calendario',
    name: 'calendario',
    component: CalendarView,
    meta: {
      title: 'Calendario'
    }
  },
  {
    path: '/mapa/:id/:name',
    name: 'ubicaciones',
    component: DetalleMapaView,
    meta: {
      title: 'Ubicación'
    },
    
  },
  /* {
    path: '/iris',
    name: 'iris',
    component: IrisView
     //meta: { authorize: [Role.Admin] } 
  },*/
  {
    path: '/social',
    name: 'social',
    component: RedesView,
    meta: {
      title: 'social'
    }
  },

  { path: '/iris', name: 'iris', component: administradorView, meta: { title: 'iris' } },
  { path: '/irisuser', name: 'irisuser', component: adminUsuariosView, meta: { title: 'irisuser' } },
  { path: '/irisevent', name: 'irisevent', component: adminEventosView, meta: { title: 'irisevent' } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})


export default router

