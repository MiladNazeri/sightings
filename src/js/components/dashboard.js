import React from 'react';
import auth from "../utils/auth.js"

export default class Dashboard extends React.Component {
  render() {
    const token = auth.getToken()

    return (
        <div>
            <h1>Dashboard</h1>
            <p>You MAde it</p>
            <p>{token}</p>
        </div>
    )

  }
}
