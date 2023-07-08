let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

/*export function miData() {
  var config = {
    method: 'get',
    url: 'http://localhost:8000/api/v1/events/',
    data: data
  };

  axios(config)
    .then(function (response) {

      for (const key in response.data.data) {
        response.data.data[key].title = String(response.data.data[key].event_name),
        response.data.data[key].start = todayStr
        
        return response.data.data[key].id = String(response.data.data[key].id)
      }

      //console.log("INITIAL_EVENTS:", response.data.data);
      //return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}


export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: miData(),
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}*/