import React from 'react';
import auth from "../utils/auth.js"

export default class Logout extends React.Component {
    componentDidMount() {
        auth.logout()
    }
  render() {
    return (
        <div>
            <p>You are now logged out</p>
        </div>
    )

  }
}


