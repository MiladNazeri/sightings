import {dispatch, register} from '../dispatchers/dispatcher';
import SigninConstants from '../constants/signin-constants.js';
import {EventEmitter} from 'events';
import auth from '../utils/auth.js';
import api from '../api/api.js';

const CHANGE_EVENT = 'change'

const SigninStore = Object.assign(EventEmitter.prototype, {
    emitChange(){
        this.emit( CHANGE_EVENT )
    },
    addChangeListener( callback ) {
        this.on( CHANGE_EVENT, callback )
    },
    removeChangeListener( callback ) {
        this.removeListener( CHANGE_EVENT, callback )
    },
    getState() {
        return this.siginState
    },
    signinState: {
        signInEmail: "",
        signInPassword: "",
        signUpEmail: "",
        signUpPassword: "",
        error: false,
        onChange: false,
        userEmail:"",
        userID: ''
    },
    dispatcherIndex: register( function ( action ) {
        switch( action.actionType ) {
            case SigninConstants.SIGN_IN:
                signinState.signInEmail = action.signIn.email;
                signinState.signInPassword = action.signIn.password;
                auth.login(signinState.signInEmail, signinState.signInPassword, (loggedIn) => {
                    if(!loggedIn)
                        return signinState.error = true;
                })
                break;

            case SigninConstants.SIGN_UP:
                signinState.signInEmail = action.signUp.email;
                signinState.signInPassword = action.signUp.password;
                auth.signup(signinState.signUpEmail, signinState.signUpPassword, (loggedIn) => {
                    if(!loggedIn)
                        return signinState.error = true;
                })
                break;
        }

        SigninStore.emitChange();
    })
})

export default SigninStore;







// event.preventDefault()
// auth.login(this.state.signInEmail, this.state.signInPassword, (loggedIn) => {
//     console.log("loggedIn as cb", loggedIn)
//     if(!loggedIn)
//         return this.setState({ error: true })

//     const { location } = this.props

//     if (location.state && location.state.nextPathname) {
//         this.context.history.replaceState(null, location.state.nextPathname)
//     } else {
//         this.context.history.replaceState(null, '/')
//     }

// })
