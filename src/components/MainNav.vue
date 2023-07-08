<template>
  <nav class="navbar navbar-expand-lg gradientBG">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">
        <img src="@/assets/iris-logo-white.svg" alt="Iris [Start Up Lab]">
      </a> -->
      <router-link class="navbar-brand nav-link" :to="{ name: 'home' }">
        <img src="@/assets/iris-logo2-white.svg" alt="Iris [Start Up Lab]" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'eventos' }">Talleres</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'agenda' }">Mi agenda</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'mapa' }">Mapa</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'social' }">Redes Sociales</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'calendario' }">Calendario</router-link>
          </li>
        </ul>
      </div>
      <span class="navbar-toggler-icon navbar-dark" data-bs-toggle="offcanvas" data-bs-target="#onNavbar"
        aria-controls="onNavbar" v-show=administrador>
      </span>
    </div>
  </nav>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="onNavbar" aria-labelledby="offcanvasNavbarLabel"  v-show=administrador>

    <div class="offcanvas-body">
      <ul class="navbar-nav text-center flex-grow-1 pe-3">
        <a href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none text-center">
          <img src="@/assets/iris-logo2-white.svg" alt="Iris [Start Up Lab]" style="width: 40%; height: 50%;" />
        </a>
        <hr>
        <li class="offcanvas-nav-item"  v-show=administrador>
          <router-link class="nav-link" :to="{ name: 'iris' }">
            <i class="fa fa-cogs" aria-hidden="true"></i>
            Administrador
          </router-link>
        </li>

        <li class="offcanvas-nav-item"  v-show=administrador>
          <router-link class="nav-link" :to="{ name: 'irisuser' }">
            <i class="fa fa-user" aria-hidden="true"></i>
            Usuarios
          </router-link>
        </li>

        <li class="offcanvas-nav-item"  v-show=administrador>
          <router-link class="nav-link" :to="{ name: 'irisevent' }">
            <i class="fa fa-graduation-cap" aria-hidden="true">
            </i>
            Eventos
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import roleUser from '../services/role-user'
import UserService from '../services/user.service'
export default {
  data() {
    return {
      administrador: false
    }
  },
  mounted() {

    this.jsonIdEvent()
    $('.nav-item').on('click', function () {
      $('.navbar-collapse').collapse('hide')
    })
  },
  methods: {
    async jsonIdEvent() {
      const token = localStorage.getItem('token')

      UserService.LoadUser(token).then(res => res.json())
        .then(data => {

          if (data.is_admin === 1) {
            this.administrador = true
          }

          if (!data.is_admin === 0) {
            this.administrador = false
          }
          //this.TraceEvent( data.name,  data.id)
        }).catch(error => {
          console.log('This Error LoadUser', error);
        })

    },
  },

};
</script>

<style>
.navbar {
  padding-left: 8px;
  padding-right: 8px;
}

.navbar-brand img {
  width: auto;
  height: 45px;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,208,15, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.navbar-toggler {
  border: none !important;
  background-color: rgba(0, 0, 0, 0.1);
}

.navbar-collapse .nav-link {
  color: white;
}

nav a {
  color: white !important;
}

nav a.router-link-exact-active {
  color: var(--iris-color1) !important;
}

.offcanvas,
.offcanvas-xxl,
.offcanvas-xl,
.offcanvas-lg,
.offcanvas-md,
.offcanvas-sm {
  --bs-offcanvas-zindex: 1045;
  --bs-offcanvas-width: 400px;
  --bs-offcanvas-height: 30vh;
  --bs-offcanvas-padding-x: 1rem;
  --bs-offcanvas-padding-y: 1rem;
  --bs-offcanvas-color: ;
  --bs-offcanvas-bg: #000000c7;
  --bs-offcanvas-border-width: 1px;
  --bs-offcanvas-border-color: var(--bs-border-color-translucent);
  --bs-offcanvas-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.offcanvas-title {
  color: aliceblue;
  text-align: center;
  text-transform: uppercase;
}


.offcanvas-nav-item {
  color: aliceblue;
  text-align: left;
}

.offcanvas-body {
  flex-grow: 1;
  padding: var(--bs-offcanvas-padding-y) var(--bs-offcanvas-padding-x);
  overflow-y: auto;
}

.navbar-nav {
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
}

.justify-content-end {
  justify-content: flex-end !important;
}

.btn-close {
  --bs-btn-close-color: rgb(255, 255, 255);

  --bs-btn-close-opacity: 0.5;
  --bs-btn-close-hover-opacity: 0.75;
  --bs-btn-close-focus-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  --bs-btn-close-focus-opacity: 1;
  --bs-btn-close-disabled-opacity: 0.25;
  --bs-btn-close-white-filter: invert(1) grayscale(100%) brightness(200%);
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: .25em .25em;
  color: var(--bs-btn-close-color);
  background: transparent var(--bs-btn-close-bg) center/1em auto no-repeat;
  border: 0;
  border-radius: .375rem;
  opacity: var(--bs-btn-close-opacity);
}

hr {
  FONT-VARIANT: JIS04;
  margin: 1rem 0;
  color: inherit;
  border: 1;
  border-top: 1px solid;
  opacity: 0.25;
  color: white;
}
</style>
