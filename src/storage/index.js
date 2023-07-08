import { createStore } from "vuex"
import VuexPersistence from 'vuex-persist'
import router from '../router'

const storage = createStore({
  
    state: { 
        isAuthenticated: !!localStorage.getItem('token'),
        name: '',
        id: null, 
        email: '',
        valid: true,
        role: ''
    },
    mutations: {
        loginUser(state)
        {
            state.isAuthenticated = true
        },
        logoutUser (state) {
            state.isAuthenticated = false
        },
        setName(state, name)
        {
            state.name = name
        },
        setId(state, id )
        {
            state.id = id
        },
        setEmail(state, email )
        {
            state.email = email
        },
        setRole(state, role )
        {
            state.role = role
        },
        logout(state)
        {
            router.push('/')
            state.isAuthenticated = false
            localStorage.removeItem('token')
            state.name = ''
            state.id = null
        },
        isValid(state, valid)
        {
            /*let token = localStorage.getItem('token');
            fetch('http://localhost:8000/api/v1/auth/me', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer' + token,
                'Content-Type': 'application/json; charset=UTF-8',
              },
            }) .then(res => res.json())
            .then(data => {
              if (!data.length) {
                router.push('/')
                state.isAuthenticated = false
                state.valid = valid
                localStorage.removeItem('token')
                state.name = ''
                state.id = null
              }
            })
            .catch(err => console.log(err.message))*/

        }
    },
    plugins: [
        new VuexPersistence({
          storage: window.localStorage
        }).plugin
      ]
  
})

export default storage