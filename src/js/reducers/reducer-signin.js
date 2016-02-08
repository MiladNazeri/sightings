import { CREATE_USER, LOGIN_USER, CREATE_USER_ERROR, LOGIN_ERROR } from '../actions/app-actions.js'

const INITIAL_STATE = { createUser: null, loginUser: null, createUserError: null, loginError: null}

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
    case CREATE_USER:
        return {...state, createUserError: null, createUser: action.payload};
    case LOGIN_USER:
        return {...state, loginError: null, loginUser: action.payload};
    case CREATE_USER_ERROR:
        return {...state, createUser: null, createUserError: action.payload};
    case LOGIN_ERROR:
        return {...state, loginUser: null, loginError: action.payload};
    default:
        return state;
    }
}