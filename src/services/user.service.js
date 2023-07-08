import axios from 'axios'

const API_URL = 'http://3.82.138.22/api-event-iris/public/api/v1'
//const API_URL = 'http://127.0.0.1:8000/api/v1'

class UserService {

  async getUserContent() {

    return await axios.get(API_URL + '/auth/user', {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      }
    })
  }

   async LoadUser(token) {

    return fetch(API_URL + '/auth/me', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer' + token,
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      },
    })

  }

  async LoadCreateUser(number, name, mail) {

    const registerload = {
      number: number,
      name: name,
      email: mail,
    };

    return await axios.post(API_URL + '/auth/register', registerload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'multipart/form-data'
      }
    })

  }

  async LoadSessionUser(number) {

    const payload = {
      number: number,
    };

    return await axios.post(API_URL + '/auth/login', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'multipart/form-data'
      }
    })

  }

  async Event(id) {
    try {
      const setting = {
        method: 'GET',
      }

      const retrievedloadExternalEvent = await axios.post(API_URL + '/rooms/' + id)
      const data = await fetch(retrievedloadExternalEvent)
      const json = await data.json()

      this.eventDetail = {
        id: json.id,
        evento: json.nombreEvento,
        hora: json.hora,
        ubicacion: json.ubicacion
      }
      this.serverUpdated = true

    } catch (error) {
      console.log('This Error in jsonURLuser', error)
    }
  }

  async LoadExternalEvent(id) {

    return await axios.post(API_URL + '/rooms/' + id, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    })
  }

  async ConfirmEventContent(userNumberDetaill, tallerid, eventid, lugares, nombre, hora, places) {

    const send = {
      user_id: userNumberDetaill,
      event_id: eventid,
      room_id: tallerid,
      name: nombre,
      email: 'test@gmail.com',
      room_time: hora,
      event_number_places_total: lugares,
      room_number_places_total: places,
      action: 1
    }

    const confirm = await axios.post(API_URL + '/usersevents', send, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET',
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      }
    })

    return confirm
  }

  async ConfirmCancelContent(userNumberDetaill, eventDetail) {

    const sendInfo = {
      user_id: userNumberDetaill,
      room_id: eventDetail.id,
      event_id: eventDetail.evento_id_romm,
      name: eventDetail.evento,
      email: 'test@gmail.com',
      room_time: eventDetail.hora,
      event_number_places_total: eventDetail.lugares_event,
      room_number_places_total: eventDetail.lugares_room,
      id_event_user: eventDetail.id_event_user,
      action: 2
    }


    return await axios.put(API_URL + '/usersevents/' + eventDetail.id_event_user, sendInfo, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, POST, GET',
      }
    })
  }

  async getLoadJSONContent(idevent) {
    return await axios.get(API_URL + '/usersevents/' + idevent, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      }
    })
  }

  async getEventContent() {

    return await axios.get(API_URL + '/events', {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      }
    })

  }

  

  async getRoomContent() {
    return await axios.get(API_URL + '/events', {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      }
    })
  }

  async getRoomUserContent(userId) {
    return await axios.get(API_URL + '/room/roomUser/' + userId, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      }
    })
  }

  async getRoomContent(userId) {
    return await axios.get(API_URL + '/rooms/' + userId, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      }
    })
  }

  async getRoom() {

    return await axios.get(API_URL + '/rooms', {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      }
    })
  }

  async getEventLogTraceContent(user, id) {

    const payload = {
      description: user,
      user_id: id
    }

    return await axios.post(API_URL + '/traces', payload, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    })
  }

  async updateEvent(id, activo) {

    let status = activo == 0 ? 1 : 0;

    const payload = {
      active: status,
      _method: 'PUT'
    }

    return await axios.post(API_URL + '/events/'+ id, payload, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    })
  }

  async saveEvent(eventDataNew) {

    let token = localStorage.getItem('token');

    return await axios.post(API_URL + '/events', eventDataNew, {
      headers: {
        'Authorization': 'Bearer' + token,
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    })
  }


  async updateUser(user) {

    let is_admin = user.is_admin == 0 ? 1 : 0;

    const payload = {
      is_admin: is_admin,
      _method: 'PUT'
    }

    return await axios.post(API_URL + '/auth/update/'+ user.id, payload, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    })
  }

  async updateEventData(item) {

    const dataEvent = {
      active: item.active,
      event_name: item.event_name,
      event_location: item.event_location,
      event_number_places_total: item.event_number_places_total,
      event_objective: item.event_objective,
      event_expectation: item.event_expectation,
      event_description: item.event_description,
      event_image_event: item.event_image_event,
      event_image_location: item.event_image_location,
      event_image_map: item.event_image_map,
      event_date_start: item.event_date_start,
      event_date_end: item.event_date_end,
      _method: 'PUT'
    }

    return await axios.post(API_URL + '/events/'+ item.id, dataEvent, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      }
    })
  }

  async updateEvent(item) {

    let status = item.activo == 0 ? 1 : 0;

    const payload = {
      active: status,
      _method: 'PUT'
    }

    return await axios.post(API_URL + '/events/'+ item.id, payload, {
      headers: {
        'Content-Type': 'application/json,charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    })
  }

  async NotificationUser(responsEvent) {

    return axios.post('http://34.207.85.18:3000/v1/notificacion/',
      {
        "Nombre": responsEvent.user,
        "Folio_de_reserva": responsEvent.id,
        "Fecha": responsEvent.fechaCreacion,
        "Email": responsEvent.email,
        "Asunto": responsEvent.notification,
        "Horario": responsEvent.horario,
        "Lugar": responsEvent.evento,
        "Piso": "5"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

}

export default new UserService();
