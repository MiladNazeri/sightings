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
        return axios.get(`${url}sightings/`)
    },
    createSighting(sighting) {
        return axios.post(`${url}sightings/`)
    },
    updateSighting(sighting) {
        return axios.put(`${url}sightings/`)
    },
}



export default api