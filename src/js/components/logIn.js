import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions/app-actions.js';
import { connect } from 'react-redux';


class LogIn extends React.Component {
    constructor(props){
       super(props);
       this.state = {
        error: false,
       }
    }
    static contextTypes = {
        router: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    }
    onSubmitLogin(props) {
        console.log(props)
        event.preventDefault();
        this.props.loginUser(props);
    }
    loginCheck() {
        if(this.props.loginError){
            return true;
        }
        if(this.props.login === "PASS"){
            console.log(this.props)
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        let check = this.loginCheck();
        if (!check) {
            this.context.history.pushState(null, '/pro')
        }
        const { fields: { loginEmail, loginPassword }, handleSubmit } = this.props;
        let loginId = (this.props.whaleExpertClick) ? "logIn2" : "logIn";
    return(
        <div className={loginId}>
            <form formKey="form2" onSubmit={handleSubmit(this.onSubmitLogin.bind(this)) }>
            <h1>Log In</h1>
            <div className={`form-group ${loginEmail.touched && loginEmail.invalid ? 'has-danger' : ''}`}>
                <label>
                    Email
                </label>
                <input type="email" className="form-control" {...loginEmail} />
                <div className="text-help">
                    {loginEmail.touched ? loginEmail.error : ''}
                </div>
            </div>
            <div className={`form-group ${loginPassword.touched && loginPassword.invalid ? 'has-danger' : ''}`}>
                <label>
                    Password
                </label>
                <input type="password" className="form-control" {...loginPassword} />
                <div className="text-help">
                    {loginPassword.touched ? loginPassword.error : ''}
                </div>
            </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
                {(check && !!this.props.login) && (<p>Bad login information</p>)}
        </div>
    )
    }
}
    function validate(values) {
        const errors = {};

        if (!values.loginEmail) {
            errors.loginEmail = 'Enter an Email';
        }
        if (!values.loginPassword) {
            errors.loginPassword = 'Enter a Password';
        }

        return errors;
    }

    function mapStateToProps(state) {

        return { login: state.signin.loginUser,
                 loginError: state.signin.loginError
        };
    }

    export default reduxForm({
        form: 'login',
        fields: ['loginEmail', 'loginPassword'],
        validate

    }, mapStateToProps, {loginUser} )(LogIn);