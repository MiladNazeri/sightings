import React from 'react';

export default class Default extends React.Component {
  render() {
    return (
      <div>
        <h1 style={styles.center}>Welcome to Sightings</h1>
        {this.props.children}
      </div>
    )
  }
}

var styles = {
  center: {
    textAlign: 'center'
  }
}
