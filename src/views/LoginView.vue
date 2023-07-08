<template>
  <div class="bg gradientBG">
    <div class="login">
      <div class="logo">
        <img src="@/assets/iris-logo2-white.svg" alt="Iris StartUp Lab">
      </div>
      <h1>Lanzamiento de nuestro espacio</h1>
      <div id="tiles">
        <div class="tile" v-for="(tile, index) in tiles" :key="index">
          <Tile :randomSpeed="true" />
        </div>
      </div>
      <div v-if="signup">
        <form @submit.prevent="crearUsuario">
          <Loading v-if="isLoading" />
          <div class="inputs">
            <input type="number" name="number" id="number" v-model="number" maxlength="10"
              placeholder="Número de empleado" />
            <input type="text" name="name" id="name" v-model="name" placeholder="Nombre completo">
            <input type="email" name="mail" id="mail" v-model="mail" placeholder="Correo electrónico">
            <div>
              <p v-if="errors.length">
                <b>Por favor corrige los siguientes errores:</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
              </p>
              <p v-if="resgister">
                <b>Llenar el formulario para tu registro</b>
              </p>
              <button type="submit" v-if="isButton">Crear usuario</button>
            </div>
          </div>
        </form>
      </div>
      <div v-else:>
        <form @submit.prevent="iniciarSesion()">
          <Loading v-if="isLoading" />
          <div class="inputs">
            <div>
              <input type="number" name="number" id="number" v-model="number" maxlength="10"
                placeholder="Número de empleado" />
            </div>
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </div>
      <router-link :to="{ name: 'home' }">Login</router-link>
    </div>
  </div>
  <Transition name="modal-info">
    <Modal @close="toggleModal" :modalActive="modalActive">
      <h5>Se ha producido un error con tu solicitud</h5>
      Por favor intenta ingresar de nuevo.
    </Modal>
  </Transition>
</template>

<script>
import AuthValidate from '../services/auth.validate'
import UserService from '../services/user.service'

// @ is an alias to /src
import Tile from '@/components/Tile.vue'
import Modal from '@/components/Modal.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'LoginView',
  components: { Tile, Modal, Loading },
  data() {
    return {
      number: '',
      name: '',
      mail: '',
      gmail: '',
      hotmail: '',
      signup: false, //true cuando no existe el usuario
      modalActive: false, // true si hay error
      modalID: null,
      allowClose: true,
      isLoading: false,
      isButton: true,
      resgister: false,
      tiles: [],
      errors: [],
    }
  },

  mounted() {
    for (let i = 0; i < 18; i++) {
      this.tiles.push(i)
    }
  },
  methods: {

    async crearUsuario() {

      this.resgister = false
      this.errors = [];
      
      if (!this.number) {
        this.modalActiveError = true
        this.errors.push("El número de empleado es requerido.")
      } else if (!AuthValidate.validNumber(this.number)) {
        this.modalActiveError = true
        this.errors.push("Ingresa solo números");
      }else if (!AuthValidate.validNumberLength(this.number)) {
        this.modalActiveError = true
        this.errors.push("Ingresa máximo 10 y como mínimo 5 dígitos");
      }
      if (!this.name) {
        this.modalActiveError = true
        this.errors.push("El nombre es requerido.")
      }
      if (!this.mail) {
        this.modalActiveError = true
        this.errors.push("El email es requerido.");
      } else if (!AuthValidate.validEmail(this.mail)) {
        this.modalActiveError = true
        this.errors.push("Ingresa un email válido, que no sea gmail o hotmail");
      }

      if (this.errors.length) return true

      this.resgister = false
      this.isLoading = true
      this.isButton = false
      const number = this.number
      const name = this.name
      const email = this.mail

      setTimeout(() => {

        UserService.LoadCreateUser(number, name, email).then((response) => {
          this.signup = false
          this.isLoading = false
        }).catch(error => {

          console.log('This Error LoadCreateUser', error);
          if (error.response.status == 422 ) {
            this.modalActive = false
            this.isLoading = false
            this.isButton = true
            this.errors.push("Error con tus datos verificalos ");
            if (this.errors.length) return true
          }
         
          //console.log('This Error LoadCreateUser', error.response.data.errors.email);
          //this.modalActive = true
        })
      }, 2000)

    },

    async iniciarSesion() {

      this.isLoading = true
      const number = this.number

      setTimeout(() => {
        UserService.LoadSessionUser(number).then((response) => {

          //this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
          /*localStorage.setItem('token', response.data);
          localStorage.setItem('id', response.data.userData.id);
          localStorage.setItem('userName', response.data.userData.userName);*/
          localStorage.setItem('token', response.data.access_token)
          this.$router.push('/home');

          setTimeout(() => this.jsonIdEvent(), 2000)
        }).catch(error => {

          console.log('This Error LoadSessionUser', error)
          this.isLoading = false
          this.resgister = true
          this.signup = true
        })
      }, 3000)

    },
    async jsonIdEvent() {
      const token = localStorage.getItem('token')

      UserService.LoadUser(token).then(res => res.json())
        .then(data => {

          this.$store.commit('setName', data.name)
          this.$store.commit('setId', data.id)
          this.$store.commit('setEmail', data.email)
        
          this.TraceEvent( data.name,  data.id)
        }).catch(error => {
          console.log('This Error LoadUser', error);
        })

    },
    TraceEvent(description, user_id) {

      if (description && user_id) {

        UserService.getEventLogTraceContent(description, user_id).then((response) => {

        }).catch(error => {
          console.log('This Error LoginViewTraceContent', error);
        })
      }
    },
    toggleModal() {
      if (this.allowClose) {
        this.modalActive = !this.modalActive
        if (!this.modalActive) {
          this.modalID = null
          clearTimeout(this.cancelTimeOut)
        }
      }
    },
  }
}
</script>

<style>
.bg {
  min-height: 100vh;
}

.login {
  max-width: 250px;
  min-height: 100vh;
  margin: 0 auto;
  text-align: center;
}

.login h1 {
  font-size: 2em !important;
  color: white !important;
  line-height: 1.3em !important;
  margin-bottom: 20px;
}

.login .inputs input {
  background-color: transparent !important;
  border-style: solid !important;
  border-color: #4082bf;
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  color: white;
  font-weight: bold;
}

.login .inputs input:focus {
  outline: none !important;
}

::placeholder {
  color: white !important;
  opacity: 0.5;
  font-weight: normal;
}

::-ms-input-placeholder {
  color: white !important;
  opacity: 0.5;
  font-weight: normal;
}

.login .inputs button {
  width: 100%;
  background-color: #4082bf;
  padding: 13px;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  border-style: none !important;
}

#tiles {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.logo {
  margin: 0px auto;
  padding-top: 40px;
  max-width: 350px;
}

ul {
  list-style: none;
  color: #ffffff;
}

p {
  color: #ffffff;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
