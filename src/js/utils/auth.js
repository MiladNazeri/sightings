import api from "../api/api.js"

module.exports = {
    signup(signUpObject, cb){
        cb = arguments[arguments.length-1]
         api.createUser(signUpObject)
         .then( (res) => {
            if (res) {
                var loginObject = {
                    email: signUpObject.email,
                    password: signUpObject.password
                }
                api.loginUser(loginObject)
                .then((res) => {
                    localStorage.token = res.data.user.id
                    if (cb) cb(true)
                    this.onChange(true)
                    })
            } else {
                if (cb) cb(false)
                this.onChange(false)
            }
        })
        .catch( (err) => console.log(err) )
    },
    login(email, pass, cb){
        cb = arguments[arguments.length-1]
        if (localStorage.token) {
            if (cb) cb(true)
            this.onChange(true)
            return
        }
        var loginObject = {
            email: email,
            password: pass
        }
        api.loginUser(loginObject)
        .then( (res) => {
            if (res) {
                localStorage.token = res.data.user.id
                if (cb) cb(true)
                this.onChange(true)
            } else {
                if (cb) cb(false)
                this.onChange(false)
            }
        })
    },
    getToken(){
        return localStorage.token
    },
    logout(cb){
        api.logoutUser().then( () => {
        delete localStorage.token
        if (cb) cb()
        this.onChange(false)

})

    },
    loggedIn(cb){
        return !!localStorage.token
    },
    onChange() {}
}
