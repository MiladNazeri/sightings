import axios from 'axios';
import api from '../api/api'
import auth from '../utils/auth'

export const GET_SIGHTINGS = 'GET_SIGHTINGS';
export const CREATE_SIGHTING = 'CREATE_SIGHTING';
export const UPDATE_SIGHTING = 'UPDATE_SIGHTING';
export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function createUser(user) {

    console.log("MADE IT TO CREATEUSER")
    console.log("user:", user)
    const {
        signUpEmail, signUpPassword, signUpName, signUpOrganization, signUpUserName
    } = user;
    const signUpObject = {
        email: signUpEmail,
        password: signUpPassword,
        name: signUpName,
        organization: signUpOrganization,
        userName: signUpUserName
    }
    return (dispatch) => {
        if (!localStorage.token) {
            api.createUser(signUpObject)
                .then( (res) => {
                    console.log("res",res)
                    if (res) {
                        api.loginUser({email:signUpEmail, password:signUpPassword})
                            .then((res) => {
                                console.log("res2", res)
                                localStorage.token = res.data.user.id
                                dispatch({
                                    type: CREATE_USER,
                                    payload: "PASS"
                                })
                            })
                            // .catch(error => dispatch({
                            //     type: CREATE_USER_ERROR,
                            //     payload: error
                            // }))
                    }
                })
        } else {
            dispatch({
                type: LOGIN_USER,
                payload: "PASS"
            })
        }
    }
}

    export function loginUser(user) {
        const {
            loginEmail, loginPassword
        } = user;

        var email = loginEmail;
        var password = loginPassword;
        var loginObject = {
            email: email,
            password: password
        }

        return (dispatch) => {
            if (!localStorage.token) {
                api.loginUser(loginObject)
                    .then((res) => {
                        if (res) {
                            localStorage.token = res.data.user.id
                            dispatch({
                                type: LOGIN_USER,
                                payload: "PASS"
                            })
                        } else {
                            dispatch({
                                type: LOGIN_ERROR,
                                payload: {
                                    error: true
                                }
                            })

                        }
                    })
                    .catch(() => {
                        dispatch({
                            type: LOGIN_ERROR,
                            payload: {
                                error: true
                            }
                        })
                    })
            } else {
                dispatch({
                    type: LOGIN_USER,
                    payload: "PASS"
                })
            }
        }

    }


    export function getSightings() {
        const request = api.getSightings();

        return {
            type: GET_SIGHTINGS,
            payload: request
        };
    }

    export function createSighting(sighting) {
        let request = null;
        return (dispatch) => api.createSighting(sighting)
            .then(() => {
                request = api.getSightings();
            })
            .then(() => dispatch({
                type: GET_SIGHTINGS,
                payload: request
            }));
    }

    export function updateSighting(sighting) {
        let request = null;
        return (dispatch) => api.updateSighting(sighting)
            .then(() => {
                request = api.getSightings();
            })
            .then(() => dispatch({
                type: GET_SIGHTINGS,
                payload: request
            }));
    }
