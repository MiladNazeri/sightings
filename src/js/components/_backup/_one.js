import React from 'react';
import Two from './_two.js'

export default class One extends React.Component {
render() {
    return (
    <div>
        <Two passMeDown={this.props.passMeDown} />
    </div>
    )
}
}