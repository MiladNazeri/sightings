import SigninConstants from '../constants/signin-constants.js'
import { dispatch, register } from '../dispatchers/dispatcher.js'

export default {
    submitSignUp( signUp ) {
        dispatch({
            actionType: SigninConstants.SIGN_UP, signUp
        })
    },
    submitSignIn( signIn ) {
        dispatch({
            actionType: SigninConstants.SIGN_IN, signIn
        })
    }
}