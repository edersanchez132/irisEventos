import router from '../router'

export default function roleUser() {

  let token = localStorage.getItem('token');

  fetch('http://3.82.138.22/api-event-iris/public/api/v1/auth/me', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer' + token,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }).then(res => res.json())
    .then(data => {

      if ( data.is_admin == 0 ) {

        return false
        /*router.push('/')
        localStorage.removeItem('token')
        this.$store.commit('setName', '')
        this.$store.commit('setId', null)
        this.$store.commit('setEmail', null)*/
      }

      if ( data.is_admin == 1 ) {

        return true
      }
    }).catch(err => console.log(err.message))
}

