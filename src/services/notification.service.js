import axios from 'axios'

const API_URL_NOTIFICATION = 'http://34.207.85.18:3000/v1/notificacion/'

class NotificationService {

  async NotificationUser(userName, userEmail, Respuesta) {


   return axios.post('http://34.207.85.18:3000/v1/notificacion/',
        {
          "Nombre": userName,
          "Folio_de_reserva": "234523454",
          "Fecha": "2022-02-12 12:12:00",
          "Email" : userEmail,
          "Asunto" : Respuesta,
          "Software_seleccionados": "pdf",
          "Horario": "12:12",
          "Lugar": "Materia gris",
          "Corporativo": "asdf",
          "Piso": "5"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      
       /* axios.post(API_URL_NOTIFICATION, JSON.stringify({
          "Nombre": userName,
          "Folio_de_reserva": "",
          "Fecha": "",
          "Email" : userEmail,
          "Asunto" : Evento,
          "Software_seleccionados": "",
          "Horario": "",
          "Lugar": "",
          "Corporativo": "",
          "Piso": "5"
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Content-Type': 'multipart/form-data; charset=UTF-8',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, X-Auth-Token',
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })
      .then((response) => {
      console.log('response', response);
      //return response.data.token;
      })
      .catch((error) => {
          console.log(error);
      });*/

  }
}

export default new NotificationService();
