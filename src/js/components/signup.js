import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createUser } from '../actions/app-actions.js';
import { connect } from 'react-redux';

class SignUp extends React.Component {
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
    };

    onSubmitSignup(props) {
        console.log("made it to onsubmitSignup")
        this.props.createUser(props)
            // .then( () => {
            //     this.context.router.push('/');
            // });

    }

    signupCheck(){
            if(this.props.createUserError){
                console.log("this.props.createUserError", this.props.createUserError)
                return true;
            }
            if(this.props.create === "PASS"){
                console.log("this.props.create", this.props.create)
                return false;
            }
            return true;
    }
    render() {
        let check = this.signupCheck();
        if (!check) {
            console.log("this.props check", this.props)
            console.log("this context", this.context)
            this.context.history.pushState(null, '/pro')

        }
        const { fields: { signUpUserName, signUpName, signUpEmail,signUpOrganization, signUpPassword }, handleSubmit } = this.props;
        let signupID = (this.props.whaleExpertClick) ? "signUp2" : "signUp";
    return (
        <div className={signupID}>
            <h1>Sign Up</h1>
            <form formKey="form1" onSubmit={handleSubmit(this.onSubmitSignup.bind(this)) }>
                <div className={`form-group ${ signUpUserName.touched &&  signUpUserName.invalid ? 'has-danger' : ''}`}>
                    <label>
                        User Name:
                    </label>
                    <input type="text" className="form-control" {... signUpUserName} />
                    <div className="text-help">
                        { signUpUserName.touched ?  signUpUserName.error : ''}
                    </div>
                </div>

                <div className={`form-group ${signUpName.touched && signUpName.invalid ? 'has-danger' : ''}`}>
                    <label>
                        Name
                    </label>
                    <input type="text" className="form-control" {...signUpName} />
                    <div className="text-help">
                        {signUpName.touched ? signUpName.error : ''}
                    </div>
                </div>

                <div className={`form-group ${signUpEmail.touched && signUpEmail.invalid ? 'has-danger' : ''}`}>
                    <label>
                        Email
                    </label>
                    <input type="email" className="form-control" {...signUpEmail} />
                    <div className="text-help">
                        {signUpEmail.touched ? signUpEmail.error : ''}
                    </div>
                </div>

                <div className={`form-group ${signUpOrganization.touched && signUpOrganization.invalid ? 'has-danger' : ''}`}>
                    <label>
                        Organization
                    </label>
                    <input type="text" className="form-control" {...signUpOrganization} />
                    <div className="text-help">
                        {signUpOrganization.touched ? signUpOrganization.error : ''}
                    </div>
                </div>

                <div className={`form-group ${signUpPassword.touched && signUpPassword.invalid ? 'has-danger' : ''}`}>
                    <label>
                        Sign Up Password
                    </label>
                    <input type="password" className="form-control" {...signUpPassword} />
                    <div className="text-help">
                        {signUpPassword.touched ? signUpPassword.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {(check && !!this.props.create) && (<p>Bad sign up information</p>)}
          </div>
        )
    }
}
    function validate(values) {
        const errors = {};

        if (!values.signUpUserName) {
            errors.signUpUserName = 'Enter User Name';
        }
        if (!values.signUpName) {
            errors.signUpName = 'Enter Name';
        }
        if (!values.signUpEmail) {
            errors.signUpEmail = 'Enter an Email';
        }
        if (!values.signUpOrganization) {
            errors.signUpOrganization = 'Enter an Organization';
        }
        if (!values.signUpPassword) {
            errors.signUpPassword = 'Enter a Password';
        }

        return errors;
    }

    function mapStateToProps(state) {
        return { create: state.signin.createUser,
                 createUserError: state.signin.createUserError
        };
    }

    SignUp.contextTypes = {
        router: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    }


    export default reduxForm({
        form: 'signUp',
        fields: ['signUpUserName', 'signUpName', 'signUpEmail','signUpOrganization', 'signUpPassword'],
        validate

    }, mapStateToProps, { createUser} )(SignUp);


