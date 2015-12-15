import axios from 'axios';
var url = '/api/';

var api = {
    getWhales() {
        return axios.get(`${url}whales/`)
    },
    createWhales(whale) {
        return axios.post(`${url}whales/`, whale)
    },
    getSightings() {
        console.log("Api get sightings")
        return axios.get(`${url}sightings/`)
    },
    createSighting(sighting) {
        return axios.post(`${url}sightings/`, sighting)
    },
    updateSighting(sighting) {
        return axios.put(`${url}sightings/`, sighting)
    },
}



export default api