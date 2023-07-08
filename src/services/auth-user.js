import router from '../router'
const API_URL = 'http://3.82.138.22/api-event-iris/public/api/v1/auth/me'
//const API_URL = 'http://127.0.0.1:8000/api/v1/auth/me'

export default function authHeader() {
  let token = localStorage.getItem('token');
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer' + token,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }).then(res => res.json())
    .then(data => {

      if (!data.name && !data.number) {
        router.push('/')
        localStorage.removeItem('token')
        this.$store.commit('setName', '')
        this.$store.commit('setId', null)
        this.$store.commit('setEmail', null)
      }
    }).catch(err => console.log(err.message))
}
