import axios from 'axios';
var url = '/api/';

var api = {
    loginUser(user) {
        return axios.post('login/', user)
    },
    logoutUser() {
        return axios.get(`${url}/logout/userid/`)
    },
    getSession() {
        return axios.get(`${url}/getsession/`)
    },
    createUser(user) {
        return axios.post(`${url}/users/`, user)
    },
    getUser(userid) {
        return axios.get(`${url}/users/${userid}`)
    },
    getUsers() {
        return axios.get(`${url}/users/`)
    },
    getAnimal(animalid) {
        return axios.get(`${url}/animals/${animalid}`)
    },
    createAnimal(animal) {
        return axios.post()
    },
    getSighting(sightingid) {
        return axios.get(`${url}/sightings/${sightingid}`)
    },
    getSightings() {
        return axios.get(`${url}/sightings/`)
    },
    createSighting(sighting) {
        return axios.post(`${url}/sightings/`, sighting)
    }
}



export default api