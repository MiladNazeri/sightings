import { GET_SIGHTINGS } from '../actions/app-actions.js';

export default function(state = [], action) {
    switch(action.type){
    case GET_SIGHTINGS:
        return [...action.payload.data];
    default:
        return state;
    }
}